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
    let resp =  await client.getStock( functionParams.timeSeriesIntraDay, [req.params.stockid], intervalValues.sixty );
    res.json(resp);
  }
  catch(err){
    console.log(err)
  }
})

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

router.post('/delete/:type/:name', function(req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');
  const objType = req.params.type;
  const name = req.params.name;
  const table = objType === 'Stock' ? stockSymbolTable : portfolioSymbolTable;

  if (!(name in table)) {
    res.send([{error: name + ' does not exist in the data table.'}]);
  } else {
    delete table[name];
    if (name in table) {
      res.send([{error: 'Error deleting ' + objType + ' from table.'}])
    }
    res.send(table);
  }
});

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