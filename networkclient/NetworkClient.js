const fetch = require("node-fetch");
class networkClient{
    
    constructor(){
        this.baseURl = "http://www.alphavantage.co/query?" 
        this.apikey = "ILUT5RWQ13K9DYW1"
    }
    initialize(apikey){
        this.apikey = apikey
    }

    getStock(ticker, funcParam, interval){
        let url = this.baseURl + APIParameters.function + funcParam + APIParameters.symbol + ticker+ "&"+ APIParameters.interval + interval + APIParameters.apikey + this.apikey; 
         return this.executeRequets(url)
    }

    async executeRequets(requestUrl){
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
    interval: "interval="
  }