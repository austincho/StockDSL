
class TOSELL {

    parse() {
        this.toSell = null;

        this.toSell = tokenizer.getAndCheckNext("/^\\$?[0-9]+(\\.[0-9][0-9])?$/");
    }
}

module.exports = TOSELL