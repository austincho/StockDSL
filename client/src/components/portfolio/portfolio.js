import React, { Component } from 'react'; 
import Stock from '../stocks/Stock'
import './portfolio.css'
class Portfolio extends Component { 
    constructor(props){
        super(props)
        this.state = {
            stocks: [],
            id: props.id, 
            multiplier: props.multiplier
        }    
    }
    componentDidMount() {
        this.getPortfolioInfo()
    }
    getPortfolioInfo(){
        let self = this
        var stocklist = []
        fetch('/users/' + this.state.id + '/portfolio', {
            method: 'get', 
            headers: {
                "Content-Type": "application/json", 
                'Accept': 'application/json',

            }
        })
        .then(res => {
            console.log("RESULT", res); 
            if(res.status !== 200){
                return null; 
            }
            else {
                return res.json(); 
            }
            
        })
        .then(res2 => {
            console.log(res2)
            res2 = res2[0]
            if(res2 === null){
                //handle no stocks found
                console.log("no stocks foudn"); 
                return; 
            } 
            for(let i = 0; i<res2.stocks.length; i++){
                stocklist.push(res2.stocks[i])
            }
            console.log(stocklist)
            self.setState({stocks: stocklist})
        }).catch(e => {
            console.log('error: ', e);
            this.setState({showError: true, errorText: 'error'});
            console.log(this.state.errorText);
        });
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
              </tr>
            </thead>
            <tbody>
              {
                stocks.map((value, index) => {
                    console.log(this.state)
                      return (<Stock   key={index} cond={"green"} name={value.id} price={value.value * this.state.multiplier} />)
                    
                  
                })
              }
            </tbody>
          </table>
            </div>
        )
    }

}
export default Portfolio