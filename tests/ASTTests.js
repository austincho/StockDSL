const Tokenizer = require("../src/libs/Tokenizer")
const PROGRAM = require("../src/ast/PROGRAM")

const literals = ["Create", "Add", "Remove", "Compute", "Show", ",", "{", "}", "stock", "portfolio", "Alert", "Buy", "Sell", "Currency", "on", "with", "as", "Months", "Interest"]
let tokenizer = new Tokenizer().getInstance();

class ASTTests {
    runTests() {
        /* Pass */
        //this.test("Create stock AAPL");
        //this.test("Create stock AAPL Alert true Buy 10.7 Sell 20.5");
        //this.test("Create portfolio mYportfolio");
        //this.test("Create stock AAPL Create portfolio myportfolio Add { AAPL } myportfolio Remove { AAPL } myportfolio Add { AAPL } myportfolio");

        /* Fail */
        //this.test("Create portfolio myportfolio Add { AAPL } myportfolio");
        //this.test("Create portfolio myPortfolio \n Create portfolio myPortfolio");

        /* Not Implemented */
        //this.test("Create stock AAPL Compute on AAPL Months 12 Interest 1.1");
        //this.test("Create stock AAPL Show stock AAPL as BAR");
        //this.test("Compute Currency CAD");
    }

    test(input) {
        console.log("***Test***")
        tokenizer.initialize(input, literals);
        console.log("tokenizing complete");
        const p = new PROGRAM();
        p.parse();
        console.log("parsing complete")
        p.evaluate();
        console.log("evaluating complete")
        console.log("Output:     ", p.getStatements());
        console.log("Portfolios: ", portfolioSymbolTable);
        console.log("Stocks:     ", stockSymbolTable);
    }
}

module.exports = ASTTests;