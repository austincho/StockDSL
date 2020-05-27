class FUTUREVAL {

    parse() {
        tokenizer.getAndCheckNext("on");
        this.name = tokenizer.getNext();
        tokenizer.getAndCheckNext("Months");
        this.months = tokenizer.getNext();
        tokenizer.getAndCheckNext("Interest");
        this.interest = tokenizer.getNext();
    }

    async evaluate() {
        return this.computeFutureValue(this.name, this.months, this.interest);
    }

    computeFutureValue(ticker, months, rate) {
        // mock stock data
        const tickers = [
            {
                "ticker": "AAPL",
                "quantity": 20,
                "price": 300.12
            },
            {
                "ticker": "TSLA",
                "quantity": 5,
                "price": 823.05
            },
            {
                "ticker": "MSFT",
                "quantity": 10,
                "price": 183.51
            }
        ];

        const stock = tickers.find(x => x.ticker === ticker);
        if (stock) {
            let value = stock.quantity*stock.price * (1 + (rate*.01*(months/12)));
            value = Math.floor(value * 100) / 100;
            return {
                command: "Compute",
                type: "FutureVal",
                name: this.name,
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