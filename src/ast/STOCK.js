const networkClient = require('../../networkclient/NetworkClient');
client = new networkClient(); 
class STOCK {
    parse() {
        this.ticker = tokenizer.getNext();
    }
    async getStockValue(id){
        var p =  await client.getStock( "TIME_SERIES_DAILY&", id, "60min&");
        p = p["Time Series (Daily)"][Object.keys(p["Time Series (Daily)"])[0]]
        let firstKey = Object.keys(p)[0];
        console.log(p)
        return {"values": p[firstKey]}
    }
    async evaluate() {
        if (typeof this.ticker !== 'undefined') {
            if (!(this.ticker in stockSymbolTable)) {
                console.log(this.ticker)
                let values = await this.getStockValue(this.ticker); 
                console.log(values)
                stockSymbolTable[this.ticker] = values
                return {command: "Create", type: "Stock", name: this.ticker, values: values}
            }
            else {
                throw "Stock already exists";
            }
        }
        else {
            throw "Stock ticker undefined";
        }
    }

    getName(){
        return this.ticker;
    }
}

module.exports = STOCK