// import Tokenizer from '../src/libs/Tokenizer'
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    // Comment out this line:
    //res.send('respond with a resource');
    // const literals = ["Create", "Add", "Remove", "Compute", "Show", ",", "{", "}", "stock", "portfolio", "Alert", "Buy", "Sell", "Currency", "on", "with", "as", "Months", "Interest"];
    // const tokenizer = Tokenizer();
    // tokenizer.initialize(literals);
    res.json("Hello testing");

});

module.exports = router;
