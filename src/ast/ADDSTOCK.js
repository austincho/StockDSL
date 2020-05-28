
class ADDSTOCK {

    parse() {
        this.tickers = [];
        this.portfolio = null;

        tokenizer.getAndCheckNext("add");
        tokenizer.getAndCheckNext("{")

        while (!tokenizer.checkToken("}")) {
            this.tickers.push(tokenizer.getNext());
            if (tokenizer.checkToken(",")) {
                tokenizer.getAndCheckNext(",");
            }
        }
        tokenizer.getAndCheckNext("}")
        this.portfolio = tokenizer.getNext();
    }

    evaluate() {
        if (typeof this.portfolio !== 'undefined') {
            if (!(this.portfolio in portfolioSymbolTable)) {
                throw "Portfolio does not exist"
            }
            let portfolioTickers = portfolioSymbolTable[this.portfolio];
            for (const ticker of this.tickers) {
                if (!(ticker in stockSymbolTable)) {
                    throw "Stock does not exist"
                }
                else if (portfolioTickers.includes(ticker)) {
                    throw "Portfolio already contains value"
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