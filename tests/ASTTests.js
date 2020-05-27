const Tokenizer = require("../src/libs/Tokenizer")
const PROGRAM = require("../src/ast/PROGRAM")
const Descriptor = require("../src/libs/Descriptor")
const fs = require("fs")

let tokenizer = new Tokenizer().getInstance();

class ASTTests {
    runTests() {
        /* Pass */
        //this.test("Create stock AAPL");
        //this.test("Create stock AAPL Alert true Buy 10.7 Sell 20.5");
        //this.test("Create stock AAPL Create portfolio myportfolio Add { AAPL } myportfolio");
        //this.test("Create stock AAPL Create portfolio myportfolio Add { AAPL } myportfolio Remove { AAPL } myportfolio Add { AAPL } myportfolio");
        //this.test("Create stock AAPL Compute stock AAPL Quantity 20 Months 12 Interest 1.1");
        //this.test("Create stock AAPL Create portfolio myportfolio Add { AAPL } myportfolio Compute portfolio myportfolio Quantity 1 Months 12 Interest 1.1");
        //this.test("Create stock AAPL Create portfolio myportfolio Add { AAPL } myportfolio Show portfolio myportfolio as PIE");
        //this.test("Create stock AAPL Show stock AAPL as BAR");
        //this.test("Compute Currency CAD");
        //this.test("Compute Currency CAD Compute Currency GBP");
        //this.test("Compute on TSLA Quantity 30 Months 5 Interest 15");
        // this.test("Create portfolio myPortfolio\n" +
        //     "Create stock GGOOGL\n" +
        //     "Add { GGOOGL } myPortfolio\n" +
        //     "Compute Curency CAD\n" +
        //     "Show stock GGOOGL as BAR");
        //this.test("Create stock APPL Create portfolio myPortfolio Add { APPL } myPortfolio Compute Currency CAD Show stock APPL as BAR");
        //this.test("Create stock AAPL Delete stock AAPL");
        //this.test("Create portfolio p Delete portfolio p");
        //this.test("Create stock AAPL Create stock DIST Create portfolio myportfolio Add { AAPL, DIST } myportfolio Delete stock AAPL");

        /* Fail */
        //this.test("Create portfolio myportfolio Add { AAPL } myportfolio");
        //this.test("Create portfolio myPortfolio \n Create portfolio myPortfolio");

        /* Not Implemented */

    }

    test(input) {
        console.log("***Test***")

        let descriptor = new Descriptor();
        descriptor.describe(input).then(result =>{
            descriptor.writeToJson()
            console.log(stockSymbolTable);
            console.log(portfolioSymbolTable);
            console.log(result);
        });
    }
}

module.exports = ASTTests;