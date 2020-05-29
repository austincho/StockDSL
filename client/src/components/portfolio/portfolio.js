import React, { Component } from 'react'; 
import Stock from '../stocks/Stock';
import './portfolio.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';

class Portfolio extends Component { 
    constructor(props){
        super(props)
        this.state = {
            stocks: props.stocks,
            id: props.id, 
            multiplier: props.multiplier
        }    
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
                            {this.props.stocks.map((value) => (
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
export default Portfolio