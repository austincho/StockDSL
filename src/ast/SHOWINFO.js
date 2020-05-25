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
        if (!(this.ticker in stockSymbolTable) && !(this.portfolioTag in portfolioSymbolTable)) {
            if (this.ticker !== null) {
                throw new Error("Cannot visualize nonexistent ticker: " + this.ticker);
            } else if (this.portfolioTag !== null) {
                throw new Error("Cannot visualize nonexistent portfolio: " + this.portfolioTag);
            }
        }

        let visualType = {
            "visualType": this.visualization
        }
        console.log("evaluating " + this.visualization);
        await writeStream.write(JSON.stringify(visualType, null, "\t"));
        console.log("evaluated " + this.visualization);
    }
}

module.exports = SHOWINFO