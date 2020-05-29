
class REMOVESTOCK {

    parse() {
        this.tickers = [];
        this.portfolio = null;

        tokenizer.getAndCheckNext("remove");
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
            for (const ticker of this.tickers) {
                if (!(ticker in stockSymbolTable)) {
                    throw "Stock does not exist: " + ticker
                }
                else if (!portfolioTickers.includes(ticker)) {
                    throw this.portfolio + " does not contain stock: " + ticker
                }
                else {
                    const index = portfolioTickers.indexOf(ticker);
                    portfolioTickers.splice(index, 1);
                }
            }
            portfolioSymbolTable[this.portfolio] = portfolioTickers;
            return {command: "Remove", stocks: portfolioTickers, portfolio: this.portfolio}
        }
        else {
            throw "Portfolio is undefined"
        }
    }
}

module.exports = REMOVESTOCK