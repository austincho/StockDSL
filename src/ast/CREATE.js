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
            throw "Unknown item: " + tokenizer.getNext();
        }

        this.item.parse();
    }

    evaluate() {
        if (typeof this.item !== 'undefined') {
            return this.item.evaluate();
        }
        return {};
    }
}

module.exports = CREATE