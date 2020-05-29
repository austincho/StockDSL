import React, { Component } from 'react';
import './commandinput/commandInput.css';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Portfolio from './portfolio/portfolio'
import StockContainer from './stockcontainer/stockcontainer'
class Column extends Component {

    constructor(props) {
        super(props);
        this.state={
            toCurrency: '', 
            exchangeRate: props.exchangeRate,
            portfolioData: {
                stocks: [], 
                id: "user1", 
                multiplier: 1
            }
        }
    }

   

    render() {
        console.log(this.state)
        return (
            <Grid item xs={4}>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Currency
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {this.props.currency}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Portfolios
                                    <Portfolio stocks={this.state.portfolioData.stocks} id="user1" multiplier={this.state.exchangeRate}/>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Stocks
                                    <StockContainer stocks={this.state.portfolioData.stocks} id="user1" multiplier={this.state.exchangeRate}/>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
            </Grid>
        );
    }
}

export default Column;
