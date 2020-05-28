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
            graphType: 'bar'
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
                    const quantityStr = value.type === 'Stock' ? value.quantity + ' shares of ' + value.name:
                        ' your Portfolio: { ' + value.name + ' } with ' + value.quantity + ' shares of each stock ';
                    const futureValSentence = 'After ' + value.months + ' months, the future value of ' + quantityStr + ' at an interest rate of '
                        + value.interest + '% will be ' + (parseFloat(value.futureValue)*this.state.exchangeRate).toFixed(2) + ' ' + this.state.currency + '!';
                    this.setState({futureVal: futureValSentence})
                } else if (value.hasOwnProperty('command') && value.command === 'Show') {
                    console.log("SHOW OUTPUT: ", output);
                    this.state.graphData = {
                        "2020-05-22":{
                            "1. open":"315.7700",
                            "2. high":"319.2300",
                            "3. low":"315.3500",
                            "4. close":"318.8900",
                            "5. volume":"20450754"
                        },
                        "2020-05-21":{
                            "1. open":"318.6600",
                            "2. high":"320.8900",
                            "3. low":"315.8700",
                            "4. close":"316.8500",
                            "5. volume":"25672211"
                        },
                        "2020-05-20":{
                            "1. open":"316.6800",
                            "2. high":"319.5200",
                            "3. low":"316.2000",
                            "4. close":"319.2300",
                            "5. volume":"27876215"
                        },
                        "2020-05-19":{
                            "1. open":"315.0300",
                            "2. high":"318.5200",
                            "3. low":"313.0100",
                            "4. close":"313.1400",
                            "5. volume":"25432385"
                        },
                        "2020-05-18":{
                            "1. open":"313.1700",
                            "2. high":"316.5000",
                            "3. low":"310.3241",
                            "4. close":"314.9600",
                            "5. volume":"33843125"
                        },
                        "2020-05-15":{
                            "1. open":"300.3500",
                            "2. high":"307.9000",
                            "3. low":"300.2100",
                            "4. close":"307.7100",
                            "5. volume":"41587094"
                        },
                        "2020-05-14":{
                            "1. open":"304.5100",
                            "2. high":"309.7900",
                            "3. low":"301.5300",
                            "4. close":"309.5400",
                            "5. volume":"39732269"
                        },
                        "2020-05-13":{
                            "1. open":"312.1500",
                            "2. high":"315.9500",
                            "3. low":"303.2100",
                            "4. close":"307.6500",
                            "5. volume":"50155639"
                        },
                        "2020-05-12":{
                            "1. open":"317.8300",
                            "2. high":"319.6880",
                            "3. low":"310.9100",
                            "4. close":"311.4100",
                            "5. volume":"40575263"
                        },
                        "2020-05-11":{
                            "1. open":"308.1000",
                            "2. high":"317.0500",
                            "3. low":"307.2400",
                            "4. close":"315.0100",
                            "5. volume":"36486561"
                        },
                        "2020-05-08":{
                            "1. open":"305.6400",
                            "2. high":"310.3500",
                            "3. low":"304.2900",
                            "4. close":"310.1300",
                            "5. volume":"33511985"
                        },
                        "2020-05-07":{
                            "1. open":"303.2200",
                            "2. high":"305.1700",
                            "3. low":"301.9700",
                            "4. close":"303.7400",
                            "5. volume":"28803764"
                        },
                        "2020-05-06":{
                            "1. open":"300.4600",
                            "2. high":"303.2400",
                            "3. low":"298.8700",
                            "4. close":"300.6300",
                            "5. volume":"35583438"
                        },
                        "2020-05-05":{
                            "1. open":"295.0600",
                            "2. high":"301.0000",
                            "3. low":"294.4600",
                            "4. close":"297.5600",
                            "5. volume":"36937795"
                        },
                        "2020-05-04":{
                            "1. open":"289.1700",
                            "2. high":"293.6900",
                            "3. low":"286.3172",
                            "4. close":"293.1600",
                            "5. volume":"33391986"
                        },
                        "2020-05-01":{
                            "1. open":"286.2500",
                            "2. high":"299.0000",
                            "3. low":"285.8500",
                            "4. close":"289.0700",
                            "5. volume":"60154175"
                        },
                        "2020-04-30":{
                            "1. open":"289.9600",
                            "2. high":"294.5300",
                            "3. low":"288.3500",
                            "4. close":"293.8000",
                            "5. volume":"45765968"
                        },
                        "2020-04-29":{
                            "1. open":"284.7300",
                            "2. high":"289.6700",
                            "3. low":"283.8900",
                            "4. close":"287.7300",
                            "5. volume":"34320204"
                        },
                        "2020-04-28":{
                            "1. open":"285.0800",
                            "2. high":"285.8300",
                            "3. low":"278.2000",
                            "4. close":"278.5800",
                            "5. volume":"28001187"
                        },
                        "2020-04-27":{
                            "1. open":"281.8000",
                            "2. high":"284.5400",
                            "3. low":"279.9500",
                            "4. close":"283.1700",
                            "5. volume":"29271893"
                        },
                        "2020-04-24":{
                            "1. open":"277.2000",
                            "2. high":"283.0100",
                            "3. low":"277.0000",
                            "4. close":"282.9700",
                            "5. volume":"31627183"
                        },
                        "2020-04-23":{
                            "1. open":"275.8700",
                            "2. high":"281.7500",
                            "3. low":"274.8700",
                            "4. close":"275.0300",
                            "5. volume":"31203582"
                        },
                        "2020-04-22":{
                            "1. open":"273.6100",
                            "2. high":"277.9000",
                            "3. low":"272.2000",
                            "4. close":"276.1000",
                            "5. volume":"29264342"
                        },
                        "2020-04-21":{
                            "1. open":"276.2800",
                            "2. high":"277.2500",
                            "3. low":"265.4300",
                            "4. close":"268.3700",
                            "5. volume":"45247893"
                        },
                        "2020-04-20":{
                            "1. open":"277.9500",
                            "2. high":"281.6800",
                            "3. low":"276.8500",
                            "4. close":"276.9300",
                            "5. volume":"32503750"
                        },
                        "2020-04-17":{
                            "1. open":"284.6900",
                            "2. high":"286.9450",
                            "3. low":"276.8600",
                            "4. close":"282.8000",
                            "5. volume":"53812478"
                        },
                        "2020-04-16":{
                            "1. open":"287.3800",
                            "2. high":"288.1975",
                            "3. low":"282.3502",
                            "4. close":"286.6900",
                            "5. volume":"39281290"
                        },
                        "2020-04-15":{
                            "1. open":"282.4000",
                            "2. high":"286.3300",
                            "3. low":"280.6300",
                            "4. close":"284.4300",
                            "5. volume":"32788641"
                        },
                        "2020-04-14":{
                            "1. open":"280.0000",
                            "2. high":"288.2500",
                            "3. low":"278.0500",
                            "4. close":"287.0500",
                            "5. volume":"48748672"
                        },
                        "2020-04-13":{
                            "1. open":"268.3100",
                            "2. high":"273.7000",
                            "3. low":"265.8300",
                            "4. close":"273.2500",
                            "5. volume":"32755731"
                        },
                        "2020-04-09":{
                            "1. open":"268.7000",
                            "2. high":"270.0700",
                            "3. low":"264.7000",
                            "4. close":"267.9900",
                            "5. volume":"40529123"
                        },
                        "2020-04-08":{
                            "1. open":"262.7400",
                            "2. high":"267.3700",
                            "3. low":"261.2300",
                            "4. close":"266.0700",
                            "5. volume":"42223821"
                        },
                        "2020-04-07":{
                            "1. open":"270.8000",
                            "2. high":"271.7000",
                            "3. low":"259.0000",
                            "4. close":"259.4300",
                            "5. volume":"50721831"
                        },
                        "2020-04-06":{
                            "1. open":"250.9000",
                            "2. high":"263.1100",
                            "3. low":"249.3800",
                            "4. close":"262.4700",
                            "5. volume":"50455071"
                        },
                        "2020-04-03":{
                            "1. open":"242.8000",
                            "2. high":"245.7000",
                            "3. low":"238.9741",
                            "4. close":"241.4100",
                            "5. volume":"32470017"
                        },
                        "2020-04-02":{
                            "1. open":"240.3400",
                            "2. high":"245.1500",
                            "3. low":"236.9000",
                            "4. close":"244.9300",
                            "5. volume":"41483493"
                        },
                        "2020-04-01":{
                            "1. open":"246.5000",
                            "2. high":"248.7200",
                            "3. low":"239.1300",
                            "4. close":"240.9100",
                            "5. volume":"44054638"
                        },
                        "2020-03-31":{
                            "1. open":"255.6000",
                            "2. high":"262.4900",
                            "3. low":"252.0000",
                            "4. close":"254.2900",
                            "5. volume":"49250501"
                        },
                        "2020-03-30":{
                            "1. open":"250.7400",
                            "2. high":"255.5200",
                            "3. low":"249.4000",
                            "4. close":"254.8100",
                            "5. volume":"41994110"
                        },
                        "2020-03-27":{
                            "1. open":"252.7500",
                            "2. high":"255.8700",
                            "3. low":"247.0500",
                            "4. close":"247.7400",
                            "5. volume":"51054153"
                        },
                        "2020-03-26":{
                            "1. open":"246.5200",
                            "2. high":"258.6800",
                            "3. low":"246.3600",
                            "4. close":"258.4400",
                            "5. volume":"63140169"
                        },
                        "2020-03-25":{
                            "1. open":"250.7500",
                            "2. high":"258.2500",
                            "3. low":"244.3000",
                            "4. close":"245.5200",
                            "5. volume":"75900510"
                        },
                        "2020-03-24":{
                            "1. open":"236.3600",
                            "2. high":"247.6900",
                            "3. low":"234.3000",
                            "4. close":"246.8800",
                            "5. volume":"71882773"
                        },
                        "2020-03-23":{
                            "1. open":"228.0800",
                            "2. high":"228.4997",
                            "3. low":"212.6100",
                            "4. close":"224.3700",
                            "5. volume":"84188208"
                        },
                        "2020-03-20":{
                            "1. open":"247.1800",
                            "2. high":"251.8300",
                            "3. low":"228.0000",
                            "4. close":"229.2400",
                            "5. volume":"100423346"
                        },
                        "2020-03-19":{
                            "1. open":"247.3850",
                            "2. high":"252.8400",
                            "3. low":"242.6100",
                            "4. close":"244.7800",
                            "5. volume":"67964255"
                        },
                        "2020-03-18":{
                            "1. open":"239.7700",
                            "2. high":"250.0000",
                            "3. low":"237.1200",
                            "4. close":"246.6700",
                            "5. volume":"75058406"
                        },
                        "2020-03-17":{
                            "1. open":"247.5100",
                            "2. high":"257.6100",
                            "3. low":"238.4000",
                            "4. close":"252.8600",
                            "5. volume":"81013965"
                        },
                        "2020-03-16":{
                            "1. open":"241.9500",
                            "2. high":"259.0800",
                            "3. low":"240.0000",
                            "4. close":"242.2100",
                            "5. volume":"80605865"
                        },
                        "2020-03-13":{
                            "1. open":"264.8900",
                            "2. high":"279.9200",
                            "3. low":"252.9500",
                            "4. close":"277.9700",
                            "5. volume":"92683032"
                        },
                        "2020-03-12":{
                            "1. open":"255.9400",
                            "2. high":"270.0000",
                            "3. low":"248.0000",
                            "4. close":"248.2300",
                            "5. volume":"104618517"
                        },
                        "2020-03-11":{
                            "1. open":"277.3900",
                            "2. high":"281.2200",
                            "3. low":"271.8600",
                            "4. close":"275.4300",
                            "5. volume":"64094970"
                        },
                        "2020-03-10":{
                            "1. open":"277.1400",
                            "2. high":"286.4400",
                            "3. low":"269.3700",
                            "4. close":"285.3400",
                            "5. volume":"71322520"
                        },
                        "2020-03-09":{
                            "1. open":"263.7500",
                            "2. high":"278.0900",
                            "3. low":"263.0000",
                            "4. close":"266.1700",
                            "5. volume":"71686208"
                        },
                        "2020-03-06":{
                            "1. open":"282.0000",
                            "2. high":"290.8200",
                            "3. low":"281.2300",
                            "4. close":"289.0300",
                            "5. volume":"56544246"
                        },
                        "2020-03-05":{
                            "1. open":"295.5200",
                            "2. high":"299.5500",
                            "3. low":"291.4100",
                            "4. close":"292.9200",
                            "5. volume":"46893219"
                        },
                        "2020-03-04":{
                            "1. open":"296.4400",
                            "2. high":"303.4000",
                            "3. low":"293.1300",
                            "4. close":"302.7400",
                            "5. volume":"54794568"
                        },
                        "2020-03-03":{
                            "1. open":"303.6700",
                            "2. high":"304.0000",
                            "3. low":"285.8000",
                            "4. close":"289.3200",
                            "5. volume":"79868852"
                        },
                        "2020-03-02":{
                            "1. open":"282.2800",
                            "2. high":"301.4400",
                            "3. low":"277.7200",
                            "4. close":"298.8100",
                            "5. volume":"85349339"
                        },
                        "2020-02-28":{
                            "1. open":"257.2600",
                            "2. high":"278.4100",
                            "3. low":"256.3700",
                            "4. close":"273.3600",
                            "5. volume":"106721230"
                        },
                        "2020-02-27":{
                            "1. open":"281.1000",
                            "2. high":"286.0000",
                            "3. low":"272.9600",
                            "4. close":"273.5200",
                            "5. volume":"80151381"
                        },
                        "2020-02-26":{
                            "1. open":"286.5300",
                            "2. high":"297.8800",
                            "3. low":"286.5000",
                            "4. close":"292.6500",
                            "5. volume":"49678431"
                        },
                        "2020-02-25":{
                            "1. open":"300.9500",
                            "2. high":"302.5300",
                            "3. low":"286.1300",
                            "4. close":"288.0800",
                            "5. volume":"57668364"
                        },
                        "2020-02-24":{
                            "1. open":"297.2600",
                            "2. high":"304.1800",
                            "3. low":"289.2300",
                            "4. close":"298.1800",
                            "5. volume":"55548828"
                        },
                        "2020-02-21":{
                            "1. open":"318.6200",
                            "2. high":"320.4500",
                            "3. low":"310.5000",
                            "4. close":"313.0500",
                            "5. volume":"32426415"
                        },
                        "2020-02-20":{
                            "1. open":"322.6300",
                            "2. high":"324.6500",
                            "3. low":"318.2100",
                            "4. close":"320.3000",
                            "5. volume":"25141489"
                        },
                        "2020-02-19":{
                            "1. open":"320.0000",
                            "2. high":"324.5700",
                            "3. low":"320.0000",
                            "4. close":"323.6200",
                            "5. volume":"23495991"
                        },
                        "2020-02-18":{
                            "1. open":"315.3600",
                            "2. high":"319.7500",
                            "3. low":"314.6100",
                            "4. close":"319.0000",
                            "5. volume":"38190545"
                        },
                        "2020-02-14":{
                            "1. open":"324.7300",
                            "2. high":"325.9800",
                            "3. low":"322.8500",
                            "4. close":"324.9500",
                            "5. volume":"20028447"
                        },
                        "2020-02-13":{
                            "1. open":"324.1900",
                            "2. high":"326.2200",
                            "3. low":"323.3500",
                            "4. close":"324.8700",
                            "5. volume":"23686892"
                        },
                        "2020-02-12":{
                            "1. open":"321.4700",
                            "2. high":"327.2200",
                            "3. low":"321.4700",
                            "4. close":"327.2000",
                            "5. volume":"28432573"
                        },
                        "2020-02-11":{
                            "1. open":"323.6000",
                            "2. high":"323.9000",
                            "3. low":"318.7100",
                            "4. close":"319.6100",
                            "5. volume":"23580780"
                        },
                        "2020-02-10":{
                            "1. open":"314.1800",
                            "2. high":"321.5500",
                            "3. low":"313.8500",
                            "4. close":"321.5500",
                            "5. volume":"27337215"
                        },
                        "2020-02-07":{
                            "1. open":"322.3700",
                            "2. high":"323.4000",
                            "3. low":"318.0000",
                            "4. close":"320.0300",
                            "5. volume":"29421012"
                        },
                        "2020-02-06":{
                            "1. open":"322.5700",
                            "2. high":"325.2200",
                            "3. low":"320.2648",
                            "4. close":"325.2100",
                            "5. volume":"26356385"
                        },
                        "2020-02-05":{
                            "1. open":"323.5200",
                            "2. high":"324.7600",
                            "3. low":"318.9500",
                            "4. close":"321.4500",
                            "5. volume":"29706718"
                        },
                        "2020-02-04":{
                            "1. open":"315.3100",
                            "2. high":"319.6400",
                            "3. low":"313.6345",
                            "4. close":"318.8500",
                            "5. volume":"34154134"
                        },
                        "2020-02-03":{
                            "1. open":"304.3000",
                            "2. high":"313.4900",
                            "3. low":"302.2200",
                            "4. close":"308.6600",
                            "5. volume":"43496401"
                        },
                        "2020-01-31":{
                            "1. open":"320.9300",
                            "2. high":"322.6800",
                            "3. low":"308.2900",
                            "4. close":"309.5100",
                            "5. volume":"49897096"
                        },
                        "2020-01-30":{
                            "1. open":"320.5435",
                            "2. high":"324.0900",
                            "3. low":"318.7500",
                            "4. close":"323.8700",
                            "5. volume":"31685808"
                        },
                        "2020-01-29":{
                            "1. open":"324.4500",
                            "2. high":"327.8500",
                            "3. low":"321.3800",
                            "4. close":"324.3400",
                            "5. volume":"54149928"
                        },
                        "2020-01-28":{
                            "1. open":"312.6000",
                            "2. high":"318.4000",
                            "3. low":"312.1900",
                            "4. close":"317.6900",
                            "5. volume":"40558486"
                        },
                        "2020-01-27":{
                            "1. open":"310.0600",
                            "2. high":"311.7700",
                            "3. low":"304.8800",
                            "4. close":"308.9500",
                            "5. volume":"40485005"
                        },
                        "2020-01-24":{
                            "1. open":"320.2500",
                            "2. high":"323.3300",
                            "3. low":"317.5188",
                            "4. close":"318.3100",
                            "5. volume":"36634380"
                        },
                        "2020-01-23":{
                            "1. open":"317.9200",
                            "2. high":"319.5600",
                            "3. low":"315.6500",
                            "4. close":"319.2300",
                            "5. volume":"26117993"
                        },
                        "2020-01-22":{
                            "1. open":"318.5800",
                            "2. high":"319.9900",
                            "3. low":"317.3100",
                            "4. close":"317.7000",
                            "5. volume":"25458115"
                        },
                        "2020-01-21":{
                            "1. open":"317.1900",
                            "2. high":"319.0200",
                            "3. low":"316.0000",
                            "4. close":"316.5700",
                            "5. volume":"27235039"
                        },
                        "2020-01-17":{
                            "1. open":"316.2700",
                            "2. high":"318.7400",
                            "3. low":"315.0000",
                            "4. close":"318.7300",
                            "5. volume":"34454117"
                        },
                        "2020-01-16":{
                            "1. open":"313.5900",
                            "2. high":"315.7000",
                            "3. low":"312.0900",
                            "4. close":"315.2400",
                            "5. volume":"27207254"
                        },
                        "2020-01-15":{
                            "1. open":"311.8500",
                            "2. high":"315.5000",
                            "3. low":"309.5500",
                            "4. close":"311.3400",
                            "5. volume":"30480882"
                        },
                        "2020-01-14":{
                            "1. open":"316.7000",
                            "2. high":"317.5700",
                            "3. low":"312.1700",
                            "4. close":"312.6800",
                            "5. volume":"40653457"
                        },
                        "2020-01-13":{
                            "1. open":"311.6400",
                            "2. high":"317.0700",
                            "3. low":"311.1500",
                            "4. close":"316.9600",
                            "5. volume":"30028742"
                        },
                        "2020-01-10":{
                            "1. open":"310.6000",
                            "2. high":"312.6700",
                            "3. low":"308.2500",
                            "4. close":"310.3300",
                            "5. volume":"35217272"
                        },
                        "2020-01-09":{
                            "1. open":"307.2350",
                            "2. high":"310.4300",
                            "3. low":"306.2000",
                            "4. close":"309.6300",
                            "5. volume":"42621542"
                        },
                        "2020-01-08":{
                            "1. open":"297.1600",
                            "2. high":"304.4399",
                            "3. low":"297.1560",
                            "4. close":"303.1900",
                            "5. volume":"33090946"
                        },
                        "2020-01-07":{
                            "1. open":"299.8400",
                            "2. high":"300.9000",
                            "3. low":"297.4800",
                            "4. close":"298.3900",
                            "5. volume":"27877655"
                        },
                        "2020-01-06":{
                            "1. open":"293.7900",
                            "2. high":"299.9600",
                            "3. low":"292.7500",
                            "4. close":"299.8000",
                            "5. volume":"29644644"
                        },
                        "2020-01-03":{
                            "1. open":"297.1500",
                            "2. high":"300.5800",
                            "3. low":"296.5000",
                            "4. close":"297.4300",
                            "5. volume":"36633878"
                        },
                        "2020-01-02":{
                            "1. open":"296.2400",
                            "2. high":"300.6000",
                            "3. low":"295.1900",
                            "4. close":"300.3500",
                            "5. volume":"33911864"
                        },
                        "2019-12-31":{
                            "1. open":"289.9300",
                            "2. high":"293.6800",
                            "3. low":"289.5200",
                            "4. close":"293.6500",
                            "5. volume":"25247625"
                        }
                    }
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
                            {
                                this.state.graphData !== null && !this.state.showError &&
                                <Graph graphData={this.state.graphData} graphType={this.state.graphType}/>
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
