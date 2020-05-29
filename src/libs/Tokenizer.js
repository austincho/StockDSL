class Tokenizer {
    constructor() {
        this.input = "";
        this.tokens = [];
        this.currentToken = 0;
    }

    initialize(input) {
        this.input = input;
        this.currentToken = 0;
        this.tokens = [];
        this.tokenize();
    }

    tokenize() {
        let tokenizedProgram = " " + this.input.replace(/\n/g, " ") + " ";
        tokenizedProgram = tokenizedProgram.replace(/,/g, " , ");
        tokenizedProgram = tokenizedProgram.replace(/{/g, " { ");
        tokenizedProgram = tokenizedProgram.replace(/}/g, " } ");

        for (const str of literals) {
            const r = new RegExp(" " + str + " ","ig");
            tokenizedProgram = tokenizedProgram.replace(r, " _" + str + "_ ");
        }

        tokenizedProgram = tokenizedProgram.replace(/__/g, "_");

        if (tokenizedProgram.length > 0 && tokenizedProgram.charAt(0) === '_') {
            tokenizedProgram = tokenizedProgram.substring(1); // without first character
        }

        const rawTokens = tokenizedProgram.split("_");

        for (const token of rawTokens) {
            const tokenTrimmed = token.trim();
            if (tokenTrimmed.length > 0) {
                this.tokens.push(tokenTrimmed);
            }
        }
    }

    checkNext() {
        if (this.currentToken < this.tokens.length) {
            return this.tokens[this.currentToken];
        }
        else {
            return "NO_MORE_TOKENS";
        }
    }

    getNext() {
        if (this.currentToken < this.tokens.length) {
            return this.tokens[this.currentToken++];
        }
        else {
            throw "Missing token"
        }
    }

    checkToken(str) {
        const s = this.checkNext();
        return s === str;
    }

    checkTokenRegExp(regExp) {
        const s = this.checkNext();
        return s.match(regExp);
    }

    getAndCheckNext(str) {
        const s = this.getNext();
        if (s !== str) {
            throw "Unexpected next token for Parsing! Expected something matching: " + str + " but got: " + s;
        }
        return s;
    }

    getAndCheckNextRegExp(regExp) {
        const s = this.getNext();
        if (!s.match(regExp)) {
            throw "Unexpected next token for Parsing! Expected something matching: " + regExp + " but got: " + s;
        }
        return s;
    }

    moreTokens() {
        return this.currentToken < this.tokens.length;
    }
}

class TokenizerSingleton {
    constructor() {
        if (!TokenizerSingleton.instance) {
            TokenizerSingleton.instance = new Tokenizer();
        }
    }

    getInstance() {
        return TokenizerSingleton.instance;
    }
}

module.exports = TokenizerSingleton;