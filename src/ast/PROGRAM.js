const Node = require("../libs/Node")
const CREATE = require("./CREATE")
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
            console.log("parsing complete");
            const ret = await this.evaluate();
            console.log("evaluating complete")
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
                if (await this.statements.indexOf(s) !== this.statements.length - 1 &&
                    (s.constructor.name === "SHOWINFO" || s.constructor.name === "COMPUTEINFO")) {
                  //await writeStream.write(",\n");
                }
            }
        }
        return results
    }
}

module.exports = PROGRAM