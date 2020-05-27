var express = require('express');
var router = express.Router();
const Tokenizer = require("../../src/libs/Tokenizer");
const PROGRAM = require("../../src/ast/PROGRAM");
const literals = ["Create", "Add", "Remove", "Compute", "Show", ",", "{", "}", "stock", "portfolio", "Alert", "Buy", "Sell", "Currency", "on", "with", "as", "Months", "Interest"];

router.post('/', function(req, res, next) {
    // Comment out this line:
    //res.send('respond with a resource');
    let resInfo = null;
    const input = req.body.command;
    let tokenizer = new Tokenizer().getInstance();
    tokenizer.initialize(input, literals);
    const p = new PROGRAM();

    p.parse();
    p.evaluate().then(result => {
        resInfo = result;
    }).catch(err => {
        res.json(err);
    });
    res.json(portfolioSymbolTable);

});

module.exports = router;
