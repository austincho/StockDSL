const COMMAND = require("./COMMAND")

class COMPUTEINFO {

    parse() {
        tokenizer.getAndCheckNext("Compute");
        this.command = new COMMAND();
        this.command.parse();
    }

    async evaluate() {
        console.log("evaluating " + Object.keys(this.command)[0]);
        await this.command.evaluate();
        console.log("evaluated " + Object.keys(this.command)[0]);
    }
}

module.exports = COMPUTEINFO