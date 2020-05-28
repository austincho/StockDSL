const PROGRAM = require("../ast/PROGRAM")
const fs = require("fs")

class Descriptor {
    constructor() {
        this.results = [];
    }

    async describe(input) {
        this.results = [];

        try {
            tokenizer.initialize(input);
        }
        catch(err) {
            this.results = [{error: err}]
            return this.results
        }

        const p = new PROGRAM();
        this.results = await p.start();
        return this.results
    }

    getResults() {
        return this.results;
    }

    writeToJson() {
        const result = {results: this.results}
        const writeStream = fs.createWriteStream("Output.json");
        writeStream.write(JSON.stringify(result, null, "\t"))
    }
}

module.exports = Descriptor