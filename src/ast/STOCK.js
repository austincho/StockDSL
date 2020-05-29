const fetch = require("node-fetch");

class STOCK {
    parse() {
        this.ticker = tokenizer.getNext();
    }

    async evaluate() {
        if (typeof this.ticker !== 'undefined') {
            if (!(this.ticker in stockSymbolTable)) {
                const url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + this.ticker + "&apikey=ILUT5RWQ13K9DYW1"
                const response = await fetch(url);
                if (response.ok){
                    const json = await response.json();
                    if ("Error Message" in json ||
                        json.bestMatches[0]["1. symbol"] !== this.ticker) {
                        throw "Stock cannot be found: " + this.ticker;
                    }
                    stockSymbolTable[this.ticker] = []
                    return {
                        command: "Create",
                        type: "Stock",
                        name: this.ticker
                    }
                } else {
                    throw "HTTP-Error: " + response.status;
                }
            }
            else {
                throw "Stock already exists: " + this.ticker;
            }
        }
        else {
            throw "Stock ticker undefined";
        }
    }

    getName(){
        return this.ticker;
    }
}

module.exports = STOCK