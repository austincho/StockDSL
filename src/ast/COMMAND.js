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
}

module.exports = COMMAND