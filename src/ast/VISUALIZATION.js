const visualTypes = ["BAR", "PIE", "TEXT", "TIME", "CANDLESTICK"]

class VISUALIZATION {
    parse() {
        this.visualization = null;

        for (const type of visualTypes) {
            if (tokenizer.checkToken(type)) {
                this.visualization = tokenizer.getNext();
                break;
            }
        }

    }
}

module.exports = VISUALIZATION