
class COMMAND extends STATEMENT {

    parse() {
        tokenizer.getAndCheckNext("add");
        tokenizer.getAndCheckNext("{")
        tickers.push(tokenizer.getNext());
        tokenizer.getAndCheckNext("}")
        tokenizer.getAndCheckNext("portfolio");
    }
}