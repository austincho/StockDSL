const Node = require("../libs/Node")
const CREATE = require("./CREATE")
const DELETE = require("./DELETE")
const ADDSTOCK = require("./ADDSTOCK")
const REMOVESTOCK = require("./REMOVESTOCK")
const COMPUTEINFO = require("./COMPUTEINFO")
const SHOWINFO = require("./SHOWINFO")


class PROGRAM {

    getStatements() {
        return this.statements;
    }

    async start() {
        try {
            this.parse()
            const ret = await this.evaluate();
            return ret;
        }
        catch(err) {
            return [{error: err}]
        }
    }

    parse() {
        this.statements = [];

        while (tokenizer.moreTokens()) {
            let s = null;
            if (tokenizer.checkToken("create")) {
                s = new CREATE();
            } else if (tokenizer.checkToken("delete")) {
                s = new DELETE();
            } else if (tokenizer.checkToken("add")) {
                s = new ADDSTOCK();
            } else if (tokenizer.checkToken("remove")) {
                s = new REMOVESTOCK();
            } else if (tokenizer.checkToken("compute")) {
                s = new COMPUTEINFO();
            } else if (tokenizer.checkToken("show")) {
                s = new SHOWINFO();
            } else {
                throw "Unknown statement: " + tokenizer.getNext();
            }
            s.parse();
            this.getStatements().push(s);
        }
    }

    async evaluate() {
        let results = []
        if (typeof this.statements !== 'undefined' && Array.isArray(this.statements)) {
            for (let s of this.statements) {
                results.push(await s.evaluate());
            }
        }
        return results
    }
}

module.exports = PROGRAM