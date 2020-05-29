const axios = require("axios")

class CURRENCY {

    parse() {
        tokenizer.getAndCheckNext("currency");
        this.currency = tokenizer.getNext();
        if (tokenizer.isKeyword(this.currency)) {
            throw this.currency + " is a keyword";
        }
    }

    async evaluate() {
        return await this.computeCurrencyExchange(this.currency);
    }

    async computeCurrencyExchange(toCurrency) {
        const usd = "USD"
        if (typeof this.currency !== 'undefined') {
            const fromCurrency = currentCurrency;
            // USD to new currency
            const url = "https://api.exchangeratesapi.io/latest?base=" + toCurrency + "&symbols=" + usd;
            try {
                const currencyResponse = await axios.get(url);

                currentCurrency = toCurrency
                if (toCurrency === "USD") {
                    exchangeRateFromUSDToCurrent = 1.0;
                }
                else {
                    exchangeRateFromUSDToCurrent = parseFloat(currencyResponse.data["rates"][usd]);
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

            // Current currency to new currency
            let exchangeRate = 1;
            const url2 = "https://api.exchangeratesapi.io/latest?base=" + toCurrency + "&symbols=" + fromCurrency;
            try {
                const currencyResponse = await axios.get(url2);

                exchangeRate = parseFloat(currencyResponse.data["rates"][fromCurrency])
                for (const key in stockSymbolTable) {
                    stockSymbolTable[key] = stockSymbolTable[key] * exchangeRate;
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

            return {
                command: "Compute",
                computeType: "Currency",
                from: fromCurrency,
                to: toCurrency,
                exchange: exchangeRate
            }
        }
        else {
            throw "Currency is undefined"
        }
    }

}

module.exports = CURRENCY;