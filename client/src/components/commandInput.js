import React, { Component } from 'react';
import './commandInput.css';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

class CommandInput extends Component {

    constructor(props) {
        super(props);
        this.state={
            commandList:[],
            newCommand:"",
            output: ""

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
                "Content-Type": "application/json"
            },
            body: JSON.stringify({command: this.state.newCommand})
        })
            .then(res => {
                console.log("RESULT", res);
                return res;
            })
            .then(output => this.setState({output}))
            .catch(e => console.log("error: ", e));
    }

    addCommand() {
        const command = this.state.newCommand.slice();
        // copy current list of commands
        const list = [...this.state.commandList];
        list.push(command);

        // update state of commandList and reset newCommand
        this.setState({
            commandList: list, newCommand: ""
        });
    }

    render() {
        return (
            <Grid item xs={8}>
                <Grid container>
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
                <ul>
                    {this.state.commandList.map((command, index) => {
                        return(<div key={index}>{command}</div>)
                    })}
                </ul>
            </Grid>
        );
    }
}

export default CommandInput;
