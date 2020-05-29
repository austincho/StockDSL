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
        const usd = "USD";
        let usdMultiplier = 1.0;
        if (typeof this.currency !== 'undefined') {
            const fromCurrency = currentCurrency;
            // new currency to USD
            const url = "https://api.exchangeratesapi.io/latest?base=" + currentCurrency + "&symbols=" + usd;
            try {
                if (currentCurrency !== "USD") {
                    const currencyResponse = await axios.get(url);
                    usdMultiplier = parseFloat(currencyResponse.data["rates"][usd]);
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
            const url2 = "https://api.exchangeratesapi.io/latest?base=" + usd + "&symbols=" + toCurrency;
            try {
                const currencyResponse = await axios.get(url2);

                exchangeRate = parseFloat(currencyResponse.data["rates"][toCurrency]);
                for (const key in stockSymbolTable) {
                    stockSymbolTable[key] = stockSymbolTable[key] * exchangeRate * usdMultiplier;
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
            exchangeRateFromUSDToCurrent = exchangeRate;
            currentCurrency = toCurrency;
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