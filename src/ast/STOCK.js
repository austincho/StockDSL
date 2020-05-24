
class STOCK {

    parse() {
        this.ticker = tokenizer.getNext();
        if (tokenizer.checkToken("Alert")) {
            this.alert = tokenizer.getNext();
            tokenizer.getAndCheckNext("Buy");
            this.buy = tokenizer.getNext();
            tokenizer.getAndCheckNext("Sell");
            this.sell = tokenizer.getNext();
        }
    }
}

module.exports = STOCK