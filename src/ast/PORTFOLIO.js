const PORTFOLIOTAG = require("../ast/PORTFOLIOTAG")

class PORTFOLIO {
    portfolioTag;

    parse() {
        let pTag = new PORTFOLIOTAG();
        pTag.parse();
        this.portfolioTag = pTag.portfolioTag;
    }
}

module.exports = PORTFOLIO