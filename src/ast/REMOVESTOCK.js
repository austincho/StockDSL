
class REMOVESTOCK {
    tickers = [];

    parse() {
        tokenizer.getAndCheckNext("remove");
        tokenizer.getAndCheckNext("{")

        // TODO: to remove tickers - global storage
        this.tickers.push(tokenizer.getNext());
        tokenizer.getAndCheckNext("}")
        tokenizer.getAndCheckNext("portfolio");

        // TODO: associate tickers with portfolio - global storage
    }
}