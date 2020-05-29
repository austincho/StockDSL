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
        // Add spaces to {,},,
        tokenizedProgram = tokenizedProgram.replace(/,/g, " , ");
        tokenizedProgram = tokenizedProgram.replace(/{/g, " { ");
        tokenizedProgram = tokenizedProgram.replace(/}/g, " } ");

        // Change keywords to lowercase
        for (const str of literals) {
            const r = new RegExp(" " + str + " ","ig");
            tokenizedProgram = tokenizedProgram.replace(r, " " + str + " ");
        }
        // Split at spaces
        tokenizedProgram = tokenizedProgram.split(" ");

        // Get values
        for (const token of tokenizedProgram) {
            const tokenTrimmed = token.trim();
            if (tokenTrimmed !== "") {
                this.tokens.push(tokenTrimmed);
            }
        }
    }

    checkNext() {
        if (this.currentToken < this.tokens.length) {
            return this.tokens[this.currentToken];
        }
        else {
            return null;
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
            throw "Unexpected token. Expected: " + str + " but got: " + s;
        }
        return s;
    }

    getAndCheckNextRegExp(regExp) {
        const s = this.getNext();
        if (!s.match(regExp)) {
            throw "Unexpected token. Expected: " + regExp + " but got: " + s;
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