const CURRENCY = require("./CURRENCY")
const FUTUREVAL = require("./FUTUREVAL")

class COMMAND {

    parse() {
        if (tokenizer.checkToken("currency")) {
            this.currency = new CURRENCY();
            this.currency.parse();
        }
        else if (tokenizer.checkToken("stock") || tokenizer.checkToken("portfolio")) {
            this.futureval = new FUTUREVAL();
            this.futureval.parse();
        }
    }

    async evaluate() {
        if (typeof this.currency !== 'undefined') {
            return await this.currency.evaluate();
        }
        else if (typeof this.futureval !== 'undefined') {
            return await this.futureval.evaluate();
        }
        else {
            throw "Invalid command"
        }
    }
}

module.exports = COMMAND