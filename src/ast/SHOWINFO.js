const STOCK = require("./STOCK")
const PORTFOLIO = require("./PORTFOLIO")
const VISUALIZATION = require("./VISUALIZATION")

class SHOWINFO {

    parse() {
        tokenizer.getAndCheckNext("Show");

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
                return {
                    command: "Show",
                    type: type,
                    name: ticker,
                    visualType: this.visualization
                }
            }
        }
        else if (typeof this.portfolio !== 'undefined') {
            const name = this.portfolio.getName();
            if (!(name in portfolioSymbolTable)) {
                throw "Cannot visualize nonexistent portfolio: " + name;
            }
            else {
                const type = "Portfolio"
                return {
                    command: "Show",
                    type: type,
                    name: name,
                    visualType: this.visualization
                }
            }
        }
        else {
            throw "Invalid item"
        }
    }
}

module.exports = SHOWINFO