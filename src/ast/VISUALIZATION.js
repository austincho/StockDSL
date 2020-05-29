const visualTypes = ["bar", "line", "text"]

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