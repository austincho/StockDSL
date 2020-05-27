const STOCK = require("./STOCK")
const PORTFOLIO = require("./PORTFOLIO")

class FUTUREVAL {
    parse() {
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

        tokenizer.getAndCheckNext("Quantity");
        this.quantity = tokenizer.getNext();
        tokenizer.getAndCheckNext("Months");
        this.months = tokenizer.getNext();
        tokenizer.getAndCheckNext("Interest");
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

        if (typeof this.stock !== 'undefined') {
            const ticker = this.stock.getName()
            if (!(ticker in stockSymbolTable)) {
                throw "Cannot visualize nonexistent ticker: " + ticker;
            }
            else {
                const type = "Stock"
                const value = this.computeFutureValue(ticker, type, this.quantity, this.months, this.interest);
                return {
                    command: "Compute",
                    computeType: "FutureVal",
                    name: ticker,
                    quantity: this.quantity,
                    months: this.months,
                    interest: this.interest,
                    futureValue: value
                };
            }
        }
        else if (typeof this.portfolio !== 'undefined') {
            const name = this.portfolio.getName()
            if (!(name in portfolioSymbolTable)) {
                throw "Cannot visualize nonexistent portfolio: " + name;
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

    computeFutureValue(name, type, quantity, months, rate) {
        // mock stock data
        const tickers = [
            {
                "ticker": "AAPL",
                "price": 300.12
            },
            {
                "ticker": "TSLA",
                "price": 823.05
            },
            {
                "ticker": "MSFT",
                "price": 183.51
            }
        ];

        //TODO: send request to an API that gets current stock price of ticker

        const stock = tickers.find(x => x.ticker === name);
        if (stock) {
            let value = quantity*stock.price * (1 + (rate*.01*(months/12)));
            return Math.floor(value * 100) / 100;
        }
        else {
            throw "Stock not found"
        }
    }
}

module.exports = FUTUREVAL