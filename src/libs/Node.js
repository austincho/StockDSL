const Tokenizer = require("./Tokenizer")

tokenizer = new Tokenizer().getInstance();

literals = ["Create", "Add", "Remove", "Compute", "Show", ",", "{", "}", "stock", "portfolio", "Alert", "Buy", "Sell", "Currency", "on", "with", "as", "Months", "Interest", "Quantity"]

stockSymbolTable = new Map();
portfolioSymbolTable = new Map();
