import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './commandInput.css';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CommandInput from "./commandInput";
import Column from "./column";


class AppBody extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="margins">
                <Grid container spacing={3}>
                    <CommandInput/>
                    <Column/>
                </Grid>
            </div>
        );
    }
}

export default AppBody;
