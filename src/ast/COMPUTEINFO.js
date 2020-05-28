const COMMAND = require("./COMMAND")

class COMPUTEINFO {

    parse() {
        tokenizer.getAndCheckNext("compute");
        this.command = new COMMAND();
        this.command.parse();
    }

    async evaluate() {
        return await this.command.evaluate();
    }
}

module.exports = COMPUTEINFO