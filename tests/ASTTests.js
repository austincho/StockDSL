const Tokenizer = require("../src/libs/Tokenizer")
const PROGRAM = require("../src/ast/PROGRAM")
const fs = require("fs")

const literals = ["Create", "Add", "Remove", "Compute", "Show", ",", "{", "}", "stock", "portfolio", "Alert", "Buy", "Sell", "Currency", "on", "with", "as", "Months", "Interest"]

let tokenizer = new Tokenizer().getInstance();

class ASTTests {
    runTests() {
        /* Pass */
        //this.test("Create stock AAPL");
        //this.test("Create stock AAPL Alert true Buy 10.7 Sell 20.5");
        //this.test("Create portfolio mYportfolio");
        //this.test("Create stock AAPL Create portfolio myportfolio Add { AAPL } myportfolio Remove { AAPL } myportfolio Add { AAPL } myportfolio");
        //this.test("Create stock AAPL Compute on AAPL Months 12 Interest 1.1");
        //this.test("Create stock AAPL Show stock AAPL as BAR");
        //this.test("Compute Currency CAD");
        //this.test("Compute on TSLA Months 5 Interest 15");
        // this.test("Create portfolio myPortfolio\n" +
        //     "Create stock GGOOGL\n" +
        //     "Add { GGOOGL } myPortfolio\n" +
        //     "Compute Currency CAD\n" +
        //     "Show stock GGOOGL as BAR");
        this.test("Create stock APPL Create portfolio myPortfolio Add { APPL } myPortfolio Compute Currency CAD Show stock APPL as BAR");

        /* Fail */
        //this.test("Create portfolio myportfolio Add { AAPL } myportfolio");
        //this.test("Create portfolio myPortfolio \n Create portfolio myPortfolio");

        /* Not Implemented */

    }

    test(input) {
        console.log("***Test***")

        writeStream.write("{\"results\": [");
        tokenizer.initialize(input, literals);
        console.log("tokenizing complete");
        const p = new PROGRAM();

        p.parse();
        console.log("parsing complete")

        p.evaluate().then(result => {
            // got final result
            console.log("evaluation complete");

            console.log("Output:     ", p.getStatements());
            console.log("Portfolios: ", portfolioSymbolTable);
            console.log("Stocks:     ", stockSymbolTable);
            writeStream.write("]}");

            // TODO: Low priority - fix outer bracket formatting in Output.json
            // let toBeReformatted = fs.readFileSync("Output.json", "utf8").replace(/\n*\t*/g, "")
            // console.log(toBeReformatted);
            // fs.writeFileSync("Output.json", JSON.stringify(toBeReformatted, null, "\t"));
        }).catch(err => {
            console.log("Error: " + err);
        });
    }
}

module.exports = ASTTests;