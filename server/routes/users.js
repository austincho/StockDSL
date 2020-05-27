var express = require('express');
var router = express.Router();

/* GET users listing. */
/* GET users listing. */
const userdata = [{"id": "user1", "name": "Rohan", "portfolioTags": [{"id": "p1"}]}]
const portfolios = [{"id":"p1", "stocks": [{"id": "AAPL"}]}]
router.get('/:userid/portfolio', function(req, res, next){
  userdata.forEach(function(user){
    if(user.id == req.params.userid){
      if(user.portfolioTags.length>0){
        var portfolios = []
        user.portfolioTags.forEach(function(pid){
          let getPort = getPortfolioData(pid.id);
          console.log(getPort)
          if(getPort != null){
            portfolios.push(getPort)
          }
        })
        console.log(portfolios.length)
        if(portfolios.length>0){
          res.json(portfolios); 
        }
        else {
         res.statusCode = "500"
         res.send("Internal server error")
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
