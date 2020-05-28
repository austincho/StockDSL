const fetch = require("node-fetch");
class networkClient{
    
    constructor(){
        this.baseURl = "http://www.alphavantage.co/query?" 
        this.apikey = "ILUT5RWQ13K9DYW1"
    }
    initialize(apikey){
        this.apikey = apikey
    }

    getStock(functParam, ticker, interval){
        let url = this.baseURl + APIParameters.function + functParam + APIParameters.symbol + ticker+ "&"+ APIParameters.interval + interval + APIParameters.apikey + this.apikey; 
        return this.executeRequest(url)
    }

    getCurrencyConversion(functParam, from, to){
        let url = this.baseURl + APIParameters.function + functParam + APIParameters.fromcurrency + from + "&" + APIParameters.tocurrency + to + "&" + APIParameters.apikey + this.apikey;
        return this.executeRequest(url);
    }

    getTimesSeries(functParam, ticker) {
        let url = this.baseURl + APIParameters.function + functParam + APIParameters.symbol + ticker+ "&"+ APIParameters.apikey + this.apikey; 
        return this.executeRequest(url);
    }

    isValidStock(ticker){
        let url = this.baseURl + APIParameters.function + "SYMBOL_SEARCH&keywords=" + ticker + "&" + APIParameters.apikey + this.apikey; 
        return this.executeRequest(url)
    }

    async executeRequest(requestUrl){
        let response = await fetch(requestUrl); 
        if(response.ok){
            let json = await response.json(); 
            return json; 
        }else {
            alert("HTTP-Error: " + response.status);
        }
    }
}
module.exports = networkClient; 
const APIParameters = {
    function: "function=",
    symbol: "symbol=",
    datatype: "datatype=", 
    apikey: "apikey=",
    interval: "interval=",
    fromcurrency: "from_currency=",
    tocurrency: "to_currency="
}