const axios = require("axios")

class CURRENCY {

    parse() {
        tokenizer.getAndCheckNext("Currency");
        this.currency = tokenizer.getNext();
    }

    async evaluate() {
        await this.computeCurrencyExchange(this.currency);
    }

    async computeCurrencyExchange(toCurrency) {
        const fromCurrency = "USD";
        const url = "https://api.exchangeratesapi.io/latest?base=" + fromCurrency + "&symbols=" + toCurrency;
        try {
            let currencyResponse = await axios.get(url);
            console.log(currencyResponse.data);
            writeStream.write(JSON.stringify(currencyResponse.data, null, "\t"));
            return currencyResponse.data.rates[toCurrency];
        } catch (e) {
            // some sort of error handling
            if (e.response.status === 400){
                console.log("Please ensure that the given currency symbol is valid.");
            } else if (e.response.status === 500) {
                console.log("A network error has occurred, please check your network settings.")
            } else {
                console.log("Error getting currency exchange rate.");
            }
        }
    }

}

module.exports = CURRENCY;