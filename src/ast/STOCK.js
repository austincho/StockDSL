class STOCK {
    parse() {
        this.ticker = tokenizer.getNext();
    }

    evaluate() {
        if (typeof this.ticker !== 'undefined') {
            if (!(this.ticker in stockSymbolTable)) {
                stockSymbolTable[this.ticker] = []
                return {command: "Create", type: "Stock", name: this.ticker}
            }
            else {
                throw "Stock already exists";
            }
        }
        else {
            throw "Stock ticker undefined";
        }
    }

    getName(){
        return this.ticker;
    }
}

module.exports = STOCK