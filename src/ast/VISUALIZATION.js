const visualTypes = ["bar", "pie", "text", "time", "candlestick"]

class VISUALIZATION {
    parse() {
        this.visualization = null;

        for (const type of visualTypes) {
            const r = new RegExp(type,"ig");
            if (tokenizer.checkTokenRegExp(r)) {
                this.visualization = tokenizer.getNext().toUpperCase();
                break;
            }
        }

    }
}

module.exports = VISUALIZATION