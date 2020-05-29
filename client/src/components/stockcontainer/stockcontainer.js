import React, { Component } from 'react'; 
import Stock from '../stocks/Stock';
import './stockcontainer.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';

class StockContainer extends Component { 
    constructor(props){
        super(props)
        this.state = {
            stocks: props.stocks,
            id: props.id, 
            multiplier: props.multiplier
        }    
    }
    async componentDidMount() {
        await this.getStockInfo()
        let state = this.state
        this.setState({state})
    }


    getStockInfo(){
        let self = this
        var stocklist = []
        fetch('http://localhost:3000/stocks/', {
            method: 'get', 
            headers: {
                "Content-Type": "application/json", 
                'Accept': 'application/json',
            }
        })
        .then(res => {
            console.log("RESULT", res); 
            if(res.status !== 200){
                console.log("Not okay")
                return null; 
            }
            else {
                return res.json(); 
            }
            
        })
        .then(res2 => {
            console.log(res2)
            if(res2 === null){
                //handle no stocks found
                console.log("no stocks foudn"); 
                return; 
            } 
            res2 = res2
            for(let i = 0; i<res2.length; i++){
                stocklist.push(res2[i])
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
        console.log(this.state)
        return (
            <div>
                <TableContainer component={Card}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>CompanyId</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.stocks.map((value) => (
                                <TableRow key={value.id}>
                                    <TableCell>{value.id}</TableCell>
                                    <TableCell>{value.values * this.state.multiplier}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        )
    }

}
export default StockContainer