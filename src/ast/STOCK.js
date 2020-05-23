
class STOCK {
    ticker;
    alert;
    buy;
    sell;

    parse() {
        this.ticker = tokenizer.getNext();
        if (tokenizer.getAndCheckNext("Alert")) {
            this.alert = tokenizer.getNext();
            tokenizer.getAndCheckNext("Buy");
            this.buy = tokenizer.getNext();
            tokenizer.getAndCheckNext("Sell");
            this.sell = tokenizer.getNext();
        }
    }
}

module.exports = STOCK