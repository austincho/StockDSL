
class TICKER extends STATEMENT {
    ticker;

    setName(name) {
        this.ticker = name;
    }

    parse() {
        this.setName(tokenizer.getAndCheckNext("[A-Z]+"));
    }
}

module.exports = TICKER