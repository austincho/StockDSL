const Tokenizer = require("./Tokenizer")

currentCurrency = "USD";

tokenizer = new Tokenizer().getInstance();

literals = ["Create", "Delete", "Add", "Remove", "Compute", "Show", ",", "{", "}", "stock", "portfolio", "Alert", "Buy", "Sell", "Currency", "on", "with", "as", "Months", "Interest", "Quantity"]

stockSymbolTable = new Map();
portfolioSymbolTable = new Map();
