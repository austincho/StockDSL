const CURRENCY = require("./CURRENCY")
const FUTUREVAL = require("./FUTUREVAL")

class COMMAND {

    parse() {
        if (tokenizer.checkToken("Currency")) {
            this.currency = new CURRENCY();
            this.currency.parse();
        }
        else if (tokenizer.checkToken("on")) {
            this.futureval = new FUTUREVAL();
            this.futureval.parse();
        }
    }

    async evaluate() {
        if (this.currency != null) {
            await this.currency.evaluate();
        }
        else if (this.futureval != null) {
            await this.futureval.evaluate();
        }
    }
}

module.exports = COMMAND