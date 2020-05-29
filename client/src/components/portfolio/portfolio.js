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
import Typography from "@material-ui/core/Typography";

class Portfolio extends Component { 
    constructor(props){
        super(props)
        this.state = {
            id: props.id, 
            multiplier: props.multiplier
        }    
    }

    render() {
        console.log('PROPS PORTFOLIO: ', this.props);
        console.log('STATE: ', this.state);
        return (
            <div>
                {this.props.portfolioList.map((value) => (
                    <div key={value.id}>
                        <Typography pb={2} align="left" variant="subtitle2">
                            {value.id}
                        </Typography>
                        <TableContainer component={Card}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>CompanyId</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {value.stocks.map((value) => (
                                        <TableRow key={value.id}>
                                            <TableCell>{value.id}</TableCell>
                                            <TableCell>{value.values.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
                    </div>
                ))}

            </div>
        )
    }

}
export default Portfolio