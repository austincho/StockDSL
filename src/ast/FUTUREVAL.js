class FUTUREVAL {

    parse() {
        tokenizer.getAndCheckNext("on");
        this.name = tokenizer.getNext();
        tokenizer.getAndCheckNext("Quantity");
        this.quantity = tokenizer.getNext();
        tokenizer.getAndCheckNext("Months");
        this.months = tokenizer.getNext();
        tokenizer.getAndCheckNext("Interest");
        this.interest = tokenizer.getNext();
    }

    async evaluate() {
        return this.computeFutureValue(this.name, this.quantity, this.months, this.interest);
    }

    computeFutureValue(ticker, quantity, months, rate) {
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

        const stock = tickers.find(x => x.ticker === ticker);
        if (stock) {
            let value = quantity*stock.price * (1 + (rate*.01*(months/12)));
            value = Math.floor(value * 100) / 100;
            return {
                command: "Compute",
                type: "FutureVal",
                name: this.name,
                quantity: this.quantity,
                months: this.months,
                interest: this.interest,
                futureValue: value
            };
        }
        else {
            throw "Stock not found"
        }
    }
}

module.exports = FUTUREVAL