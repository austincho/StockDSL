class STOCK {
    parse() {
        this.ticker = tokenizer.getNext();
        if (tokenizer.checkToken("Alert")) {
            tokenizer.getAndCheckNext("Alert");
            this.alert = tokenizer.getNext();
            tokenizer.getAndCheckNext("Buy");
            this.buy = tokenizer.getNext();
            tokenizer.getAndCheckNext("Sell");
            this.sell = tokenizer.getNext();
        }
    }

    evaluate() {
        if (typeof this.ticker !== 'undefined') {
            if (!(this.ticker in stockSymbolTable)) {
                // Check if Alert exists
                if (typeof this.alert !== 'undefined' &&
                    typeof this.buy !== 'undefined' &&
                    typeof this.sell !== 'undefined') {
                    const alertStr = this.alert.toLowerCase();
                    // Check Alert
                    if (alertStr === "true" || alertStr === "false" ||
                        alertStr === "t" || alertStr === "f") {
                        const bAlert = alertStr === "true" || alertStr === "t";
                        // Check Buy
                        if (isNaN(this.buy)) {
                            throw "Buy is not a number"
                        }
                        // Check Sell
                        else if (isNaN(this.sell)) {
                            throw "Sell is not a number"
                        }
                        else {
                            stockSymbolTable[this.ticker] = [bAlert, parseFloat(this.buy), parseFloat(this.sell)];
                        }
                    }
                    else {
                        throw "Not a valid alert"
                    }
                }
                else {
                    stockSymbolTable[this.ticker] = []
                }
            }
            else {
                throw "Stock already exists";
            }
        }
    }
}

module.exports = STOCK