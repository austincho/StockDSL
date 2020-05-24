

class VISUALIZATION {

    parse() {
        this.visualization = null;

        this.visualization = tokenizer.getAndCheckNext("(BAR)|(PIE)|(TEXT)|(TIME)|(CANDLESTICK)");
    }
}

module.exports = VISUALIZATION