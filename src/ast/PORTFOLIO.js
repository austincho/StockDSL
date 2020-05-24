const PORTFOLIOTAG = require("../ast/PORTFOLIOTAG")

class PORTFOLIO {

    parse() {
        this.portfolioTag = null;

        let pTag = new PORTFOLIOTAG();
        pTag.parse();
        this.portfolioTag = pTag.portfolioTag;
    }
}

module.exports = PORTFOLIO