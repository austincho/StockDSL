class PORTFOLIO {
    parse() {
        this.portfolioTag = tokenizer.getAndCheckNextRegExp(/[a-z]+/ig);
    }

    evaluate() {
        if (typeof this.portfolioTag !== 'undefined') {
            if (!(this.portfolioTag in portfolioSymbolTable)) {
                portfolioSymbolTable[this.portfolioTag] = [];
            }
            else {
                throw "Portfolio already exists";
            }
        }
    }
}

module.exports = PORTFOLIO