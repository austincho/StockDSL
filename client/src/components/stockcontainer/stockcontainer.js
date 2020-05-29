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
            stocks: props.stocks.stocks,
            id: props.id, 
            multiplier: props.multiplier
        }    
    }

    render() {
        console.log('STOCK CONTAINER PROPS: ', this.props);
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
                                    <TableCell>{value.values.toFixed(2)}</TableCell>
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