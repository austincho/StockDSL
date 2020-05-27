import React, { Component } from 'react'; 
import Stock from './stocks/Stock'

class Portfolio extends Component { 
    constructor(props){
        super(props)
        this.state = {
            stocks: [{"companyid": "AAPL", "value": 100}],
            id: "p1"
            
        }    
    }
    componentDidMount() {
        this.getPortfolioInfo()
    }
    getPortfolioInfo(){
        let self = this
        let stocklist = []
        fetch('/portfolio/' + this.state.id, {
            method: 'get', 
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            console.log("RESULT", res); 
            if(res.status != 200){
                return null; 
            }
            return res; 
        })
        .then((json) => {
            console.log(json);
            if(json == null){
                //handle no stocks found
                return; 
            } 
            json.stocks.forEach(element => {
                stocklist.push(element)
            });
            self.setState({stocks: stocklist})
        })
    }

    render() {
        let stocks = this.state.stocks; 
        return (
            <div>
                 <table>
            <thead>
              <tr>
                <th>CompanyID</th>
                <th>Price</th>
                <th>Shares</th>
                <input className="search" onChange={this.handleChange}></input>
              </tr>
            </thead>
            <tbody>
              {
                stocks.map((value, index) => {
                      return (<Stock   key={index} cond={"green"} name={value.companyid} price={value.value} />)
                    
                  
                })
              }
            </tbody>
          </table>
            </div>
        )
    }

}
export default Portfolio