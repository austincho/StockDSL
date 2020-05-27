var express = require('express');
var router = express.Router();
const Tokenizer = require("../../src/libs/Tokenizer");
const Descriptor = require("../../src/libs/Descriptor");

router.post('/', function(req, res, next) {
    // Comment out this line:
    //res.send('respond with a resource');
    const input = req.body.command;
    let ret = null;
    let tokenizer = new Tokenizer().getInstance();
    let descriptor = new Descriptor();
    descriptor.describe(input).then(result =>{
        descriptor.writeToJson();
        ret = result;
        res.send(ret);
    }).catch(err => {
        res.send(err);
    });
});

module.exports = router;
