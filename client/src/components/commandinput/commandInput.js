import React, { Component } from 'react';
import './commandInput.css';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Column from "../column";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card/Card";
import CommandList from "../commandList";
import Graph from "../charts/graph";
import * as d3 from "d3";

class CommandInput extends Component {

    constructor(props) {
        super(props);
        this.state={
            id: props.id, 
            commandList:[],
            newCommand:'',
            output: '',
            errorText: '',
            showError: false,
            currency: 'USD',
            toCurrency: '',
            exchangeRate: 1.00,
            futureVal: null,
            graphData: null,
            graphType: null,
            portfolioData: {
                stocks: [], 
                id: "user1", 
                multiplier: 1
            }
        }
        this.columRef = React.createRef()
    }

    updateInput(key, value) {
        this.setState({
            [key]: value
        });
    }

    handleCommand() {
        this.addCommand();
        this.callTokenizer();
    }

    



    callTokenizer() {
        fetch('/tokenize', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({command: this.state.newCommand})
        })
            .then(res => {
                console.log(res.status);
                if (res.status !== 200) {
                    this.setState({showError: true, errorText: res.json()});
                    return;
                }
                return res.json();
            }).then(output => {
                console.log(output);
                this.handleOutput(output);
                this.setState({output});
            }).catch(e => {
                console.log('error: ', e);
                this.setState({showError: true, errorText: 'error'});
                console.log(this.state.errorText);
            });
    }

    async handleOutput(output) {
        if (Array.isArray(output) && output.length>0) {
            for (let value of output) {
                if (value.hasOwnProperty('error')) {
                    this.setState({showError: true, errorText: value.error});
                } else if (value.hasOwnProperty('command') && value.computeType === 'Currency') {
                    this.setState({currency: value.to, exchangeRate: value.exchange});
                } else if (value.hasOwnProperty('command') && value.computeType === 'FutureVal') {
                    const quantityStr = value.type === 'Stock' ? value.quantity + ' shares of ' + value.name:
                        ' your Portfolio: { ' + value.name + ' } with ' + value.quantity + ' shares of each stock ';
                    const futureValSentence = 'After ' + value.months + ' months, the future value of ' + quantityStr + ' at an interest rate of '
                        + value.interest + '% will be ' + (parseFloat(value.futureValue)*this.state.exchangeRate).toFixed(2) + ' ' + this.state.currency + '!';
                    this.setState({futureVal: futureValSentence})
                } else if (value.hasOwnProperty('command') && value.command === 'Show' && this.state.graphData === null) {            
                    this.setState({graphType: output[0].visualType, graphData: output[0].data});

                } else if (value.hasOwnProperty('comand') && (value.command === 'Delete' || value.command === 'Remove')) {
                    this.getPortfolioInfo();
                }
            }

            let state = this.state
            this.setState({state})
        } else {
            this.setState({showError: true, errorText: 'Error receiving output'});
            console.log(this.state.errorText);
        }
    }

    getPortfolioInfo(){
        var stocklist = []
        fetch('http://localhost:3000/users/' + "user1" + '/portfolio', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            }
        })
            .then(res => {
                console.log("RESULT", res);
                if(res.status !== 200){
                    console.log("Not okay commandinput")
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
                    console.log("no stocks found");
                    return;
                }
                res2 = res2[0]
                for(let i = 0; i<res2.stocks.length; i++){
                    stocklist.push(res2.stocks[i])
                }
                console.log('STOCKLIST: ', stocklist);
                this.setState({portfolioData: {
                        stocks: stocklist,
                        id: "user1",
                        multiplier: this.state.exchangeRate
                    }});
                // this.setState({stocks: stocklist})
            }).catch(e => {
            console.log('error: ', e);
            this.setState({showError: true, errorText: 'error'});
            console.log(this.state.errorText);
        });
    }

    componentDidMount(){
        this.getPortfolioInfo();
    }
    addCommand() {
        const command = this.state.newCommand.slice();
        // copy current list of commands
        const list = [...this.state.commandList];
        list.push({command:command, time: this.getTime()});

        // update state of commandList and reset newCommand
        this.setState({
            commandList: list, 
            newCommand: '', 
            showError: false, 
            errorText: '', 
            toCurrency: '', 
            futureVal: null,
            graphData: null
        });


        d3.selectAll("svg").remove();
    }

    getTime() {
        let time = new Date();
        return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    }

    render() {
        return (
            <div className="margins">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="command-input">Command Input</InputLabel>
                                            <OutlinedInput
                                                id="command-input"
                                                value={this.state.newCommand}
                                                onChange={e => this.updateInput("newCommand", e.target.value)}
                                                labelWidth={120}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button size="large" variant="contained" color="primary" onClick={() => this.handleCommand()}>
                                            Enter
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            {this.state.showError &&
                            <Alert severity="error">{this.state.errorText}</Alert>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {this.state.futureVal !== null && !this.state.showError &&
                            <Card>
                                <CardContent align="left">
                                    <Typography variant="h6" component="h2">
                                        Future Value
                                    </Typography>
                                    <Typography variant="body2">
                                        {this.state.futureVal}
                                    </Typography>
                                </CardContent>
                            </Card>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <div id="#graphModal">
                            {this.state.graphData !== null && this.state.graphType  !== null && !this.state.showError &&
                                <Graph graphData={this.state.graphData} graphType={this.state.graphType} currency={this.state.currency} exchangeRate={this.state.exchangeRate} />
                            }
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <CommandList commandsSent={this.state.commandList}/>
                        </Grid>
                    </Grid>
                    <Column portfolioData={this.state.portfolioData} exchangeRate={this.state.exchangeRate} currency={this.state.currency}/>
                </Grid>
            </div>
        );
    }
}

export default CommandInput;
