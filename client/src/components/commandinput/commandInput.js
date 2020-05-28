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
            futureVal: null
        }
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


    handleOutput(output) {
        if (Array.isArray(output) && output.length>0) {
            for (let value of output) {
                if (value.hasOwnProperty('error')) {
                    this.setState({showError: true, errorText: value.error});
                } else if (value.hasOwnProperty('command') && value.computeType === 'Currency') {
                    this.setState({currency: value.to, exchangeRate: value.exchange});
                } else if (value.hasOwnProperty('command') && value.computeType === 'FutureVal') {
                    const futureValSentence = 'After ' + value.months + ' months, the future value of ' + value.quantity + ' shares of ' + value.name + ' at an interest rate of '
                        + value.interest + '% will be ' + (parseFloat(value.futureValue)*this.state.exchangeRate).toFixed(2) + ' ' + this.state.currency + '!';
                    this.setState({futureVal: futureValSentence})
                } else if (value.hasOwnProperty('comand') && (value.command === 'Delete' || value.command === 'Remove')) {
                    // TODO: call method that gets portfolio/stock info so data reloads
                }
            }
        } else {
            this.setState({showError: true, errorText: 'Error receiving output'});
            console.log(this.state.errorText);
        }
    }

    addCommand() {
        const command = this.state.newCommand.slice();
        // copy current list of commands
        const list = [...this.state.commandList];
        list.push({command:command, time: this.getTime()});

        // update state of commandList and reset newCommand
        this.setState({
            commandList: list, newCommand: '', showError: false, errorText: '', toCurrency: '', futureVal: null
        });
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
                            <CommandList commandsSent={this.state.commandList}/>
                        </Grid>
                    </Grid>
                    <Column exchangeRate={this.state.exchangeRate} currency={this.state.currency}/>
                </Grid>
            </div>
        );
    }
}

export default CommandInput;
