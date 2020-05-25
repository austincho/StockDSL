const Tokenizer = require("./Tokenizer");
const fs = require("fs");

writeStream = fs.createWriteStream("Output.json");
tokenizer = new Tokenizer().getInstance();