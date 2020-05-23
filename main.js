const Tokenizer = require("./libs/Tokenizer")
const PROGRAM = require("./libs/PROGRAM")

const input = "Create myPortfolio\n" +
    "Add AAPL portfolio myPortfolio";

const literals = ["Create", "Add", "Remove", "Compute", "Show", ",", "portfolio", "Alert", "Buy", "Sell", "Currency", "on", "with", "as"]
const token = new Tokenizer().getInstance();
token.initialize(input, literals);

let p = new PROGRAM();
//p.parse();
