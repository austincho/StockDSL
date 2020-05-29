
class ADDSTOCK {

    parse() {
        this.tickers = [];

        tokenizer.getAndCheckNext("add");
        tokenizer.getAndCheckNext("{")

        this.tickers.push(tokenizer.getNext());

        while (tokenizer.checkToken(",")) {
            tokenizer.getAndCheckNext(",");
            this.tickers.push(tokenizer.getNext());
        }

        tokenizer.getAndCheckNext("}")
        this.portfolio = tokenizer.getNext();
    }

    evaluate() {
        if (typeof this.portfolio !== 'undefined') {
            if (!(this.portfolio in portfolioSymbolTable)) {
                throw "Portfolio does not exist: " + this.portfolio
            }
            let portfolioTickers = portfolioSymbolTable[this.portfolio];
            if (this.tickers.length === 0) {
                throw "Not adding anything to portfolio: " + this.portfolio
            }
            for (const ticker of this.tickers) {
                if (!(ticker in stockSymbolTable)) {
                    throw "Stock does not exist: " + ticker
                }
                else if (portfolioTickers.includes(ticker)) {
                    throw this.portfolio + " already contains stock: " + ticker
                }
                else {
                    portfolioTickers.push(ticker);
                }
            }
            portfolioSymbolTable[this.portfolio] = portfolioTickers;
            return {command: "Add", stocks: portfolioTickers, portfolio: this.portfolio}
        }
        else {
            throw "Portfolio is undefined"
        }
    }
}

module.exports = ADDSTOCK