const STOCK = require("./STOCK")
const PORTFOLIO = require("./PORTFOLIO")
const VISUALIZATION = require("./VISUALIZATION")

class SHOWINFO {

    parse() {
        tokenizer.getAndCheckNext("Show");

        let item = null;
        if (tokenizer.checkToken("stock")) {
            tokenizer.getAndCheckNext("stock")
            item = new STOCK();
        } else if (tokenizer.checkToken("portfolio")) {
            tokenizer.getAndCheckNext("portfolio")
            item = new PORTFOLIO();
        } else {
            throw new Error("Unknown item: " + tokenizer.getNext());
        }

        item.parse();
        if (item.ticker !== null) {
            this.ticker = item.ticker;
        } else if (item.portfolioTag !== null) {
            this.portfolioTag = item.portfolioTag;
        }

        tokenizer.getAndCheckNext("as");

        let visualize = new VISUALIZATION;
        visualize.parse();
        this.visualization = visualize.visualization;
    }

    async evaluate() {
        let type = ""
        let name = ""
        if (typeof this.ticker !== 'undefined') {
            if (!(this.ticker in stockSymbolTable)) {
                throw "Cannot visualize nonexistent ticker: " + this.ticker;
            }
            else {
                type = "Stock"
                name = this.ticker
            }
        }
        else if (typeof this.portfolioTag !== 'undefined') {
            if (!(this.portfolioTag in portfolioSymbolTable)) {
                throw "Cannot visualize nonexistent portfolio: " + this.portfolioTag;
            }
            else {
                type = "Portfolio"
                name = this.portfolioTag
            }
        }
        else {
            throw "Invalid item"
        }

        return {
            command: "Show",
            type: type,
            name: name,
            visualType: this.visualization
        }
    }
}

module.exports = SHOWINFO