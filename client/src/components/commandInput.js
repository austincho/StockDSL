import React, { Component } from 'react';
import './commandInput.css';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
const axios = require('axios');
const fetch = require('node-fetch');

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
        var url ='http://localhost:3000/tokenize';
        var headers = {
            "Content-Type": "text/plain"
        };
        var data = this.state.newCommand;
        fetch(url, { method: 'POST', headers: headers, body: data})
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                console.log(json);
                // Do something with the returned data.
            });
        // axios.put(
        //         "http://localhost:3000/tokenize",
        //         this.state.newCommand,
        //         {headers: {"Content-Type": "text/plain"}}
        //     )
        //     .then(r => console.log(r))
        //     .catch(e => console.log(e));

    }
    /*
    * var url ='https://example.com';
var headers = {
  "Content-Type": "application/json",
  "client_id": "1001125",
  "client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
}
var data = {
  "name": "Wade Wilson",
  "occupation": "Murderer",
  "age": "30 (forever)"
}
fetch(url, { method: 'POST', headers: headers, body: data})
  .then((res) => {
     return res.json()
})
.then((json) => {
  console.log(json);
  // Do something with the returned data.
});*/

        // callTokenizer() {
        // List<String> literals = Arrays.asList("def", "set", "print", "new", ",", "{", "}", "call", "return", "(", ")");
        // Tokenizer.makeTokenizer("input.tvar",literals);
        // PROGRAM p = new PROGRAM();
        // p.parse();
        // p.evaluate(symbolTable);
        // System.out.println("completed successfully");
        // System.out.println(symbolTable);

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
