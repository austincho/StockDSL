
class TICKER {

    setName(name) {
        this.ticker = name;
    }

    parse() {
        this.ticker = "";

        this.setName(tokenizer.getAndCheckNext("[A-Z]+"));
    }
}

module.exports = TICKER