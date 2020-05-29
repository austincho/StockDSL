const STOCK = require("./STOCK")
const PORTFOLIO = require("./PORTFOLIO")
const VISUALIZATION = require("./VISUALIZATION")
const fetch = require("node-fetch");

class SHOWINFO {

    parse() {
        tokenizer.getAndCheckNext("show");

        if (tokenizer.checkToken("stock")) {
            tokenizer.getAndCheckNext("stock")
            this.stock = new STOCK();
            this.stock.parse();
        } else if (tokenizer.checkToken("portfolio")) {
            tokenizer.getAndCheckNext("portfolio")
            this.portfolio = new PORTFOLIO();
            this.portfolio.parse();
        } else {
            throw "Unknown item: " + tokenizer.getNext();
        }

        tokenizer.getAndCheckNext("as");

        let visualize = new VISUALIZATION;
        visualize.parse();
        this.visualization = visualize.visualization;
    }

    async evaluate() {
        if (typeof this.stock !== 'undefined') {
            const ticker = this.stock.getName();
            if (!(ticker in stockSymbolTable)) {
                throw "Cannot visualize nonexistent ticker: " + ticker;
            }
            else {
                const type = "Stock"
                const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&apikey=ILUT5RWQ13K9DYW1"
                const response = await fetch(url);
                if (response.ok){
                    const json = await response.json();
                    if ("Error Message" in json) {
                        throw "Stock cannot be found: " + ticker;
                    }
                    else if (!("Time Series (Daily)" in json)) {
                        throw "Stock cannot be found: " + ticker;
                    }
                    let ret = {"Time Series (Daily)": {}}
                    for (const date in json["Time Series (Daily)"]) {
                        ret["Time Series (Daily)"][date] = {"1. open": parseFloat(json["Time Series (Daily)"][date]["1. open"])}
                        ret["Time Series (Daily)"][date]["2. high"] = parseFloat(json["Time Series (Daily)"][date]["2. high"])
                        ret["Time Series (Daily)"][date]["4. close"] = parseFloat(json["Time Series (Daily)"][date]["4. close"])
                    }
                    return {
                        command: "Show",
                        type: type,
                        name: ticker,
                        visualType: this.visualization,
                        data: ret
                    }
                } else {
                    throw "HTTP-Error: " + response.status;
                }


            }
        }
        else if (typeof this.portfolio !== 'undefined') {
            const name = this.portfolio.getName();
            if (!(name in portfolioSymbolTable)) {
                throw "Portfolio does not exist: " + name;
            }
            else {
                let ret = {"Time Series (Daily)": {}}
                for (const ticker of portfolioSymbolTable[name]) {
                    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&apikey=ILUT5RWQ13K9DYW1"
                    const response = await fetch(url);
                    if (response.ok){
                        const json = await response.json();
                        if ("Error Message" in json) {
                            throw "Stock cannot be found: " + ticker;
                        }
                        else if (!("Time Series (Daily)" in json)) {
                            throw "Stock cannot be found: " + ticker;
                        }

                        for (const date in json["Time Series (Daily)"]) {
                            if (date in ret["Time Series (Daily)"]) {
                                ret["Time Series (Daily)"][date]["1. open"] += parseFloat(json["Time Series (Daily)"][date]["1. open"])
                                ret["Time Series (Daily)"][date]["2. high"] += parseFloat(json["Time Series (Daily)"][date]["2. high"])
                                ret["Time Series (Daily)"][date]["4. close"] += parseFloat(json["Time Series (Daily)"][date]["4. close"])
                            } else {
                                ret["Time Series (Daily)"][date] = {"1. open": parseFloat(json["Time Series (Daily)"][date]["1. open"])}
                                ret["Time Series (Daily)"][date]["2. high"] = parseFloat(json["Time Series (Daily)"][date]["2. high"])
                                ret["Time Series (Daily)"][date]["4. close"] = parseFloat(json["Time Series (Daily)"][date]["4. close"])
                            }
                        }
                    } else {
                        throw "HTTP-Error: " + response.status;
                    }
                }
                const type = "Portfolio"
                return {
                    command: "Show",
                    type: type,
                    name: name,
                    visualType: this.visualization,
                    data: ret
                }
            }
        }
        else {
            throw "Invalid item"
        }
    }
}

module.exports = SHOWINFO