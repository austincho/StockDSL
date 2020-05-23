const Tokenizer = require("./libs/Tokenizer")

const input = "Add { AAPL } portfolio myportfolio";
//const input = "Create portfolio myportfolio";
//const input = "Add AAPL Alert true Buy 100 Sell 1000 portfolio MyPortfolio";
//const input = "Compute FutureVal on AAPL Months 12 Interest 1.1";
//const input = "Show AAPL as BARGRAPH"
//const input = "Compute Currency CAD"
//const input = "Add { AAPL, GGOOGL, DIST } portfolio myportfolio";
//const input = "Remove { AAPL, GGOOGL, DIST }"
//const input = "Create stock AAPL"

const literals = ["Create", "Add", "Remove", "Compute", "Show", "stock", "portfolio", "Alert", "Buy", "Sell", "Currency", "on", "Months", "Interest", "as", "{", "}", ","]
const token = new Tokenizer().getInstance();
token.initialize(input, literals);