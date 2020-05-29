var express = require('express');
var router = express.Router();
const Tokenizer = require("../../src/libs/Tokenizer");
const Descriptor = require("../../src/libs/Descriptor");

router.get('/testdata', function(req,res){ 
    //testing only!    
    let tests = ["CREATE stock AAPL", "CREATE stock DIS", "CREATE portfolio myportfolio", "Add { AAPL } myportfolio"]
    let tokenizer = new Tokenizer().getInstance(); 
    let descriptor = new Descriptor(); 
    results = []
    tests.forEach(el => {
        descriptor.describe(el).then(result => {
           // descriptor.writeToJson(); 
            ret = result 
            result.push(ret)
            console.log(ret)
        })
    })
    console.log(portfolioSymbolTable)
    res.send(portfolioSymbolTable)
  });
router.post('/', function(req, res, next) {
    // Comment out this line:
    //res.send('respond with a resource');
    const input = req.body.command;
    let ret = null;
    let tokenizer = new Tokenizer().getInstance();
    let descriptor = new Descriptor();
    descriptor.describe(input).then(result =>{
        //descriptor.writeToJson();
        ret = result;
        res.send(ret);
    }).catch(err => {
        res.send(err);
    });
});

module.exports = router;
