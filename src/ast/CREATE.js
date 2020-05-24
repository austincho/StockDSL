const STOCK = require("./STOCK")
const PORTFOLIO = require("./PORTFOLIO")

class CREATE {
    parse() {
        tokenizer.getAndCheckNext("Create");

        this.item = null;
        if (tokenizer.checkToken("stock")) {
            tokenizer.getAndCheckNext("stock")
            this.item = new STOCK();
        } else if (tokenizer.checkToken("portfolio")) {
            tokenizer.getAndCheckNext("portfolio")
            this.item = new PORTFOLIO();
        } else {
            throw new Error("Unknown item: " + tokenizer.getNext());
        }

        this.item.parse();
    }

    evaluate() {
        if (typeof this.item !== 'undefined') {
            this.item.evaluate();
        }
    }
}

module.exports = CREATE