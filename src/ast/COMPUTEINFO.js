const COMMAND = require("./COMMAND")

class COMPUTEINFO {

    parse() {
        tokenizer.getAndCheckNext("Compute");
        this.command = new COMMAND();
        this.command.parse();
    }

    async evaluate() {
        console.log("evaluating " + JSON.stringify(this.command));
        await this.command.evaluate();
        console.log("evaluated " + JSON.stringify(this.command));
    }
}

module.exports = COMPUTEINFO