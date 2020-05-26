import React, { Component } from 'react';
import './commandInput.css';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class Column extends Component {

    constructor(props) {
        super(props);
        this.state={
            currency: ''
        }
    }

    render() {
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
                                    USD
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Portfolios
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Hello
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Column;
