const Tokenizer = require("./Tokenizer")
const fs = require("fs")

writeStream = fs.createWriteStream("Output.json");
readStream = fs.createReadStream("Output.json");
tokenizer = new Tokenizer().getInstance();

stockSymbolTable = new Map();
portfolioSymbolTable = new Map();
