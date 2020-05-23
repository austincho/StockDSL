const Node = require("../libs/Node")
const CREATE = require("./CREATE")
const ADDSTOCK = require("./ADDSTOCK")
const REMOVESTOCK = require("./REMOVESTOCK")
const COMPUTEINFO = require("./COMPUTEINFO")
// const SHOWINFO = require("./SHOWINFO")


class PROGRAM {
    statements;

    constructor() {
        this.statements = [];
    }

    getStatements() {
        return this.statements;
    }

    parse() {
        while (tokenizer.moreTokens()) {
            let s = null;
            if (tokenizer.checkToken("Create")) {
                s = new CREATE();
            } else if (tokenizer.checkToken("Add")) {
                s = new ADDSTOCK();
            } else if (tokenizer.checkToken("Remove")) {
                s = new REMOVESTOCK();
            } else if (tokenizer.checkToken("Compute")) {
                s = new COMPUTEINFO();
            } else if (tokenizer.checkToken("Show")) {
                s = new SHOWINFO();
            } else {
                throw new Error("Unknown statement: " + tokenizer.getNext());
            }
            s.parse();
            this.getStatements().push(s);
        }
        console.log("Statements: ")
        console.info(this.getStatements());
    }
}

module.exports = PROGRAM