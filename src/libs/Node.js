const Tokenizer = require("./Tokenizer")

currentCurrency = "USD";

tokenizer = new Tokenizer().getInstance();

literals = ["create", "delete", "add", "remove", "compute", "show", ",", "{", "}", "stock", "portfolio", "currency", "with", "as", "months", "interest", "quantity"]

stockSymbolTable = new Map();


portfolioSymbolTable = new Map();
