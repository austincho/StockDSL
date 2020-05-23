class FUTUREVAL {

    parse() {
        tokenizer.getAndCheckNext("on");
        this.name = tokenizer.getNext();
        tokenizer.getAndCheckNext("Months");
        this.months = tokenizer.getNext();
        tokenizer.getAndCheckNext("Interest");
        this.interest = tokenizer.getNext();
    }
}

module.exports = FUTUREVAL