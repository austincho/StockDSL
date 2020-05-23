class CURRENCY {

    parse() {
        tokenizer.getAndCheckNext("Currency");
        this.currency = tokenizer.getNext();
    }
}

module.exports = CURRENCY;