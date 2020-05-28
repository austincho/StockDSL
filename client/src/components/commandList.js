import React, { Component } from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card/Card";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

class CommandList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent align="left">
                        <Typography variant="h5" component="h2">
                            Commands History
                        </Typography>
                        <Typography variant="subtitle1">
                            <ul>
                                {this.props.commandsSent.map((obj) => {
                                    return(
                                        <div key={obj.time}>
                                            <Grid container>
                                                <Grid item xs={2}>{obj.time}</Grid>
                                                <Grid item xs={10}>{obj.command}</Grid>
                                            </Grid>
                                        </div>)
                                })}
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default CommandList;
