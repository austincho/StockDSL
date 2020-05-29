var express = require('express');
var router = express.Router();

/* GET users listing. */
/* GET users listing. */
const userdata = [{"id": "user1", "name": "Rohan", "portfolioTags": [{"id": "p1"}]}]
const portfolios = [{"id":"p1", "stocks": [{"id": "AAPL", "value": 200}]}]
//still need to get values 
router.get('/:userid/portfolio', function(req, res, next){
  userdata.forEach(function(user){
    if(user.id == req.params.userid){
      if(portfolioSymbolTable!==null){
        var portfolios = []
        console.log(portfolioSymbolTable)
        Object.keys(portfolioSymbolTable).forEach(function(key) {
          //right now the key is showing up as key not potfolio ID PLS FIX 
          let value = portfolioSymbolTable[key]
          let key2 = key
          console.log(key)
          console.log(stockSymbolTable)
        var toret = new Object(); 
        toret.id = key2 
        stocks = []
        value.forEach(function(e){
          var stock = new Object()
          stock.id = e
          //implement get value from stocksymbol table function
          //stock.value = getStockValueData(stock.id)
          Object.keys(stockSymbolTable).forEach(function(key) {
            if(key===stock.id){
              stock.values = stockSymbolTable[key].values
            }
          })
          stocks.push(stock)
        })
        toret.stocks = stocks
        
          portfolios.push(toret)
        })
        
        console.log(portfolios.length)
        if(portfolios.length>0){
          res.statusCode = 200
          res.json(portfolios); 
        }
        else {
         res.statusCode = "500"
         res.send("Portfoliolength of 0 ")
        }
      }
      else {
        res.statusCode = "299"
        res.send("user has no portfolios")
      }
    }
    else {
      res.statusCode = "298"
        res.send("user does not exist")
    }
  })
  
});
function getPortfolioData(id) {
  var retValue = null
  portfolios.forEach(function(port){
    if(port.id == id)
    console.log(port)
   retValue = port
  })
  return retValue
};

function getStocksData(stocks){
  
}


router.get('/', function(req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
    id: 1,
    username: "testuser1"
  }, {
    id: 2,
    username: "testuser2"
  }]);
});

module.exports = router;
