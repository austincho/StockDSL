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
            exchangeRate: 1,
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
                } else if (value.hasOwnProperty('command') && value.type === 'Currency') {
                    this.setState({currency: value.to, exchangeRate: value.exchange});
                } else if (value.hasOwnProperty('command') && value.type === 'FutureVal') {
                    if (value.interest === 'NULLTOKEN') {
                        this.setState({showError: true, errorText: 'Unexpected next token for Parsing! Please provide an interest rate'})
                    }
                    this.setState({futureVal: value.futureValue})
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
        list.push(command);

        // update state of commandList and reset newCommand
        this.setState({
            commandList: list, newCommand: '', showError: false, errorText: '', toCurrency: '', exchangeRate: null, futureVal: null
        });
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
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        Future Value
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {this.state.futureVal}
                                    </Typography>
                                </CardContent>
                            </Card>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <ul>
                                {this.state.commandList.map((command, index) => {
                                    return(<div key={index}>{command}</div>)
                                })}
                            </ul>
                        </Grid>
                    </Grid>
                    <Column currency={this.state.currency}/>
                </Grid>
            </div>
        );
    }
}

export default CommandInput;
