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
        //console.log(tokenizedProgram);

        for (const str of literals) {
            const r = new RegExp(" " + str + " ","ig");
            tokenizedProgram = tokenizedProgram.replace(r, " _" + str + "_ ");
        }
        //console.log(tokenizedProgram);

        tokenizedProgram = tokenizedProgram.replace(/__/g, "_");
        //console.log(tokenizedProgram);
        if (tokenizedProgram.length > 0 && tokenizedProgram.charAt(0) === '_') {
            tokenizedProgram = tokenizedProgram.substring(1); // without first character
        }
        //console.log(tokenizedProgram);
        const rawTokens = tokenizedProgram.split("_");

        for (const token of rawTokens) {
            const tokenTrimmed = token.trim();
            if (tokenTrimmed.length > 0) {
                this.tokens.push(tokenTrimmed);
            }
        }
        //console.log(this.tokens);
    }

    checkNext() {
        let token = "";
        if (this.currentToken < this.tokens.length) {
            token = this.tokens[this.currentToken];
        }
        else {
            token = "NO_MORE_TOKENS";
        }
        return token;
    }

    getNext() {
        let token = "";
        if (this.currentToken < this.tokens.length) {
            token = this.tokens[this.currentToken];
            this.currentToken++;
        }
        else {
            throw "Missing token"
        }
        return token;
    }

    checkToken(str) {
        let s = this.checkNext();
        return s === str;
    }

    checkTokenRegExp(regExp) {
        let s = this.checkNext();
        return s.match(regExp);
    }

    getAndCheckNext(str) {
        let s = this.getNext();
        if (s !== str) {
            throw "Unexpected next token for Parsing! Expected something matching: " + str + " but got: " + s;
        }
        return s;
    }

    getAndCheckNextRegExp(regExp) {
        let s = this.getNext();
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