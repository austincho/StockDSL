const axios = require("axios")

class CURRENCY {

    parse() {
        tokenizer.getAndCheckNext("Currency");
        this.currency = tokenizer.getNext();
    }

    async evaluate() {
        return await this.computeCurrencyExchange(this.currency);
    }

    async computeCurrencyExchange(toCurrency) {
        const fromCurrency = "USD";
        const url = "https://api.exchangeratesapi.io/latest?base=" + fromCurrency + "&symbols=" + toCurrency;
        try {
            let currencyResponse = await axios.get(url);

            return {
                command: "Compute",
                type: "Currency",
                from: fromCurrency,
                to: toCurrency,
                exchange: currencyResponse.data["rates"][toCurrency]
            }
        } catch (e) {
            // some sort of error handling
            if (e.response.status === 400){
                throw "Please ensure that the given currency symbol is valid."
            } else if (e.response.status === 500) {
                throw "A network error has occurred, please check your network settings."
            } else {
                throw "Error getting currency exchange rate."
            }
        }
    }

}

module.exports = CURRENCY;