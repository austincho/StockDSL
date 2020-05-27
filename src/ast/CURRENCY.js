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
        if (typeof this.currency !== 'undefined') {
            const fromCurrency = currentCurrency;
            const url = "https://api.exchangeratesapi.io/latest?base=" + currentCurrency + "&symbols=" + toCurrency;
            try {
                let currencyResponse = await axios.get(url);

                currentCurrency = toCurrency

                return {
                    command: "Compute",
                    computeType: "Currency",
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
        else {
            throw "Currency is undefined"
        }
    }

}

module.exports = CURRENCY;