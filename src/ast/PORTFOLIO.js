class PORTFOLIO {
    parse() {
        this.portfolioTag = tokenizer.getAndCheckNextRegExp(/[a-z]+/ig);
        if (tokenizer.isKeyword(this.portfolioTag)) {
            throw this.portfolioTag + " is a keyword";
        }
    }

    async evaluate() {
        if (typeof this.portfolioTag !== 'undefined') {
            if (!(this.portfolioTag in portfolioSymbolTable)) {
                portfolioSymbolTable[this.portfolioTag] = [];
                return {
                    command: "Create",
                    type: "Portfolio",
                    name: this.portfolioTag
                }
            }
            else {
                throw "Portfolio already exists: " + this.portfolioTag;
            }
        }
        else {
            throw "Portfolio tag undefined";
        }
    }

    getName() {
        return this.portfolioTag
    }
}

module.exports = PORTFOLIO