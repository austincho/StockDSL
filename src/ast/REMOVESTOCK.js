
class REMOVESTOCK {

    parse() {
        this.tickers = [];
        this.portfolio = null;

        tokenizer.getAndCheckNext("remove");
        tokenizer.getAndCheckNext("{")

        while (!tokenizer.checkToken("}")) {
            this.tickers.push(tokenizer.getNext());
            if (tokenizer.checkToken(",")) {
                tokenizer.getAndCheckNext(",");
            }
        }

        tokenizer.getAndCheckNext("}")

        this.portfolio = tokenizer.getNext();
        console.log("Tickers: " + this.tickers);
        console.log("Portfolio: " + this.portfolio);
    }
}

module.exports = REMOVESTOCK