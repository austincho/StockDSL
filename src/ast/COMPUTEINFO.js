const COMMAND = require("./COMMAND")

class COMPUTEINFO {

    parse() {
        tokenizer.getAndCheckNext("Compute");
        this.command = new COMMAND();
        this.command.parse();
    }
}

module.exports = COMPUTEINFO