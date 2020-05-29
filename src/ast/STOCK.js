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
        return {"values": p[firstKey]}
    }
    async evaluate() {
        if (typeof this.ticker !== 'undefined') {
            if (!(this.ticker in stockSymbolTable)) {
                const values = await this.getStockValue(this.ticker);
                stockSymbolTable[this.ticker] = parseFloat(values.values)
                return {command: "Create", type: "Stock", name: this.ticker, values: values.values}
            }
            else {
                throw "Stock already exists: " + this.ticker;
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