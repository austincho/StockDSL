var express = require('express');
var router = express.Router();
const networkClient = require('../../networkclient/NetworkClient');
/* GET home page. */
var client = new networkClient(); 


router.get('/', function(req, res, next) {
  console.log(stockSymbolTable);
  res.render('index', { title: 'Express' });
});
router.get('/stocks', function(req, res, next){
  console.log(stockSymbolTable)
  stocks = []
  Object.keys(stockSymbolTable).forEach(function(key){
    var stock = new Object(); 
    stock.id = key; 
    stock.values = stockSymbolTable[key]
    stocks.push(stock)
  })
  console.log(stocks)
  res.json(stocks)
})
router.get('/stock/:stockid/current', async(req,res) => {
  var p =  await client.getStock( functionParams.timeSeriesDaily, [req.params.stockid], intervalValues.sixty );
  p = p["Time Series (Daily)"][Object.keys(p["Time Series (Daily)"])[0]]
  res.json(p)
})
//first thing to implement this one enbales getting the stockID 
router.get("/stock/:stockid", async(req,res) => {
  try{
    let resp =  await client.getStock( functionParams.timeSeriesIntraDay, [req.params.stockid], intervalValues.sixty );
    res.json(resp);
  }
  catch(err){
    console.log(err)
  }
})

router.get('/currency', async(req,res) => {
  res.json({currency: currentCurrency})
})


router.get("/stock/query/:queryname", async(req,res) => {
  if(req.param.queryname === ""){
    //handle error
  }
  try{
    let resp = await client.isValidStock(req.params.queryname); 
    if(resp.bestMatches[0]!==null){
      res.json(resp.bestMatches[0]);
    }
    
    
  }
  catch(err){

  }
} )
// Currency Convestion
// Ex. "/currencyConversion/USD/CAD"
router.get("/currencyConversion/:from/:to", async(req, res) => {
  try {
    let resp = await client.getCurrencyConversion(functionParams.currencyExch, [req.params.from], [req.params.to])
    res.json(resp);
  }
  catch(err) {
    console.log(err);
  }
})

// Return Time Series Information in Daily and Monthly Intervals
// Ex. /graph/daily/AAPL
// Ex. /graph/monthly/AAPL
router.get("/graph/:time/:stockid/", async(req, res) =>  {
  try {
    let time = [req.params.time];
    let timeFunctParam = "";
    if (time == "daily") {
      timeFunctParam = functionParams.timeSeriesDaily;
    } else if (time == "monthly") {
      timeFunctParam = functionParams.timeSeriesMonthly;
    }
    let resp = await client.getTimesSeries(timeFunctParam, [req.params.stockid]);
    res.json(resp);
  } catch (err) {
    console.log(err);
    }
})

module.exports = router;

const functionParams = {
  timeSeriesIntraDay: "TIME_SERIES_INTRADAY&",
  currencyExch: "CURRENCY_EXCHANGE_RATE&",
  timeSeriesDaily: "TIME_SERIES_DAILY&",
  timeSeriesMonthly: "TIME_SERIES_MONTHLY&"
}
// https://www.alphavantage.co/documentation/
const intervalValues = {
  one: "1min&",
  five: "5min&",
  sixty: "60min&"
}