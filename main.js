const Tokenizer = require("./src/libs/Tokenizer")
const PROGRAM = require("./src/ast/PROGRAM")

// const input = "Create portfolio myPortfolio\n" +
//     "Add {  AAPL, GGOOGL, DIST  } myPortfolio\n" +
//     "Remove { AAPL, GGOOGL, DIST } myPortfolio\n" +
//     "Show stock APPL as BAR";
//const input = "Compute Currency CAD";
const input = "Compute on TSLA Months 5 Interest 15";
//const input = "Add { AAPL } portfolio myportfolio";
//const input = "Create portfolio myportfolio";
//const input = "Add AAPL Alert true Buy 100 Sell 1000 portfolio MyPortfolio";
//const input = "Compute FutureVal on AAPL Months 12 Interest 1.1";
//const input = "Show stock AAPL as BAR"
//const input = "Compute Currency CAD"
//const input = "Add { AAPL, GGOOGL, DIST } portfolio myportfolio";
//const input = "Remove { AAPL, GGOOGL, DIST }"
//const input = "Create stock AAPL"


const literals = ["Create", "Add", "Remove", "Compute", "Show", ",", "{", "}", "stock", "portfolio", "Alert", "Buy", "Sell", "Currency", "on", "with", "as"]
let tokenizer = new Tokenizer().getInstance();
tokenizer.initialize(input, literals);
console.log("tokenizing complete");

let p = new PROGRAM();
p.parse();
console.log("parsing complete");

p.evaluate().then(result => {
    // got final result
    console.log("evaluation complete");
}).catch(err => {
    // got error
});