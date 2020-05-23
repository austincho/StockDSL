class Tokenizer {
    constructor() {
        this.input = "";
        this.literals = "";
        this.tokens = [];
        this.currentToken = 0;
    }

    initialize(input, literalsList) {
        this.input = input;
        this.literals = literalsList;
        this.tokenize();
    }

    tokenize() {
        let tokenizedProgram = " " + this.input.replace(/\n/g, " ") + " ";
        console.log(tokenizedProgram);
        tokenizedProgram = tokenizedProgram.replace(/,/g, " , ");
        console.log(tokenizedProgram);

        for (const str of this.literals) {
            const r = new RegExp(" " + str + " ","g");
            tokenizedProgram = tokenizedProgram.replace(r, " _" + str + "_ ");
        }
        console.log(tokenizedProgram);

        tokenizedProgram = tokenizedProgram.replace(/__/g, "_");
        console.log(tokenizedProgram);
        if (tokenizedProgram.length > 0 && tokenizedProgram.charAt(0) === '_') {
            tokenizedProgram = tokenizedProgram.substring(1); // without first character
        }
        console.log(tokenizedProgram);
        const rawTokens = tokenizedProgram.split("_");

        for (const token of rawTokens) {
            const tokenTrimmed = token.trim();
            if (tokenTrimmed.length > 0) {
                this.tokens.push(tokenTrimmed);
            }
        }
        console.log(this.tokens);
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
            token = "NULLTOKEN";
        }
        return token;
    }

    checkToken(regExp) {
        let s = this.checkNext();
        return s === regExp;
    }

    getNextAndCheck(regExp) {
        let s = this.getNext();
        if (s !== regExp) {
            //throw "Unexpected next token for Parsing! Expected something matching: " + regExp + " but got: " + s;
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