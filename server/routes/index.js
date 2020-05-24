var express = require('express');
var router = express.Router();
const networkClient = require('../../networkclient/NetworkClient');
/* GET home page. */
var client = new networkClient(); 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//first thing to implement this one enbales getting the stockID 
router.get("/stock/:stockid", async(req,res) => {
  try{
    let resp =  await client.getStock([req.params.stockid], functionParams.timeSeriesIntraDay, intervalValues.sixty );
    res.json(resp)
  }
  catch(err){
    console.log(err)
  }
})
module.exports = router;

const functionParams = {
  timeSeriesIntraDay: "TIME_SERIES_INTRADAY&",
  currencyExch: "CURRENCY_EXCHANGE_RATE&",
  timeSeriesDaily: "TIME_SERIES_DAILY&"
}
// https://www.alphavantage.co/documentation/
const intervalValues = {
  one: "1min&",
  five: "5min&",
  sixty: "60min&"
}