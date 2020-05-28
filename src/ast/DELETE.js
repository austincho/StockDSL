const STOCK = require("./STOCK")
const PORTFOLIO = require("./PORTFOLIO")

class DELETE {
    parse() {
        tokenizer.getAndCheckNext("delete");

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
    }

    evaluate() {
        if (typeof this.stock !== 'undefined') {
            const ticker = this.stock.getName();
            if (!(ticker in stockSymbolTable)) {
                throw "Cannot delete nonexistent ticker: " + ticker;
            }
            else {
                // Remove stock from all portfolios
                for (const portfolio in portfolioSymbolTable) {
                    const index = portfolioSymbolTable[portfolio].indexOf(ticker);
                    if (index > -1) {
                        portfolioSymbolTable[portfolio].splice(index, 1);
                    }
                }
                // Remove stock
                delete stockSymbolTable[ticker]

                const type = "Stock"
                return {
                    command: "Delete",
                    type: type,
                    name: ticker
                }
            }
        }
        else if (typeof this.portfolio !== 'undefined') {
            const name = this.portfolio.getName();
            if (!(name in portfolioSymbolTable)) {
                throw "Cannot delete nonexistent portfolio: " + name;
            }
            else {
                portfolioSymbolTable.delete(name);
                const type = "Portfolio"
                return {
                    command: "Delete",
                    type: type,
                    name: name
                }
            }
        }
        else {
            throw "Invalid item"
        }
    }
}

module.exports = DELETE