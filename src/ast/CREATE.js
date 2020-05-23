const STOCK = require("./STOCK")
const PORTFOLIO = require("./PORTFOLIO")


class CREATE {

    constructor() {
    }

    parse() {
        tokenizer.getAndCheckNext("Create");

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
    }
}

module.exports = CREATE