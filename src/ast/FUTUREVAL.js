const STOCK = require("./STOCK")
const PORTFOLIO = require("./PORTFOLIO")

class FUTUREVAL {
    parse() {
        if (tokenizer.checkToken("stock")) {
            this.type = "Stock"
            tokenizer.getAndCheckNext("stock")
            this.stock = new STOCK();
            this.stock.parse();
        } else if (tokenizer.checkToken("portfolio")) {
            this.type = "Portfolio"
            tokenizer.getAndCheckNext("portfolio")
            this.portfolio = new PORTFOLIO();
            this.portfolio.parse();
        } else {
            throw "Unknown item: " + tokenizer.getNext();
        }

        tokenizer.getAndCheckNext("quantity");
        this.quantity = tokenizer.getNext();
        tokenizer.getAndCheckNext("months");
        this.months = tokenizer.getNext();
        tokenizer.getAndCheckNext("interest");
        this.interest = tokenizer.getNext();
    }

    async evaluate() {
        if (typeof this.quantity === 'undefined') {
            throw "Quantity is undefined"
        } else if (typeof this.months === 'undefined') {
            throw "Months is undefined"
        } else if (typeof this.interest === 'undefined') {
            throw "Interest is undefined"
        }

        if (isNaN(this.quantity)) {
            throw "Quantity is not a number: " + this.quantity
        } else if (isNaN(this.months)) {
            throw "Months is not a number: " + this.months
        } else if (isNaN(this.interest)) {
            throw "Interest is not a number: " + this.interest
        }

        if (typeof this.stock !== 'undefined') {
            const ticker = this.stock.getName()
            if (!(ticker in stockSymbolTable)) {
                throw "Ticker does not exist: " + ticker;
            }
            else {
                const type = "Stock"
                const value = this.computeFutureValue(ticker, type, this.quantity, this.months, this.interest);
                return {
                    command: "Compute",
                    computeType: "FutureVal",
                    type: this.type,
                    name: ticker,
                    quantity: parseInt(this.quantity),
                    months: parseInt(this.months),
                    interest: parseFloat(this.interest),
                    futureValue: value
                };
            }
        }
        else if (typeof this.portfolio !== 'undefined') {
            const name = this.portfolio.getName()
            if (!(name in portfolioSymbolTable)) {
                throw "Portfolio does not exist: " + name;
            }
            else {
                const type = "Portfolio"
                let value = 0
                // Loop through stocks in portfolio
                for (const ticker of portfolioSymbolTable[name]) {
                    value += this.computeFutureValue(ticker, type, this.quantity, this.months, this.interest);
                }
                return {
                    command: "Compute",
                    computeType: "FutureVal",
                    name: name,
                    quantity: this.quantity,
                    months: this.months,
                    interest: this.interest,
                    futureValue: value
                };
            }
        }
        else {
            throw "Invalid item"
        }
    }

    computeFutureValue(ticker, type, quantity, months, rate) {
        if (!(ticker in stockSymbolTable)) {
            throw "Ticker does not exist: " + ticker;
        }
        const value = stockSymbolTable[ticker];
        const calculation = quantity*value * (1 + (rate*.01*(months/12)));
        return Math.floor(calculation * 100) / 100;
    }
}

module.exports = FUTUREVAL