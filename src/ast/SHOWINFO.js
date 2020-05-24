const STOCK = require("./STOCK")
const PORTFOLIO = require("./PORTFOLIO")
const VISUALIZATION = require("./VISUALIZATION")

class SHOWINFO {

    parse() {
        this.visualization = null;

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

        item.parse()

        tokenizer.getAndCheckNext("as");

        let visualize = new VISUALIZATION;
        visualize.parse();
        this.visualization = visualize.visualization;
    }
}

module.exports = SHOWINFO