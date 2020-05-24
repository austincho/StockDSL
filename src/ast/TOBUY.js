
class TOBUY {

    parse() {
        this.toBuy = null;

        this.toBuy = tokenizer.getAndCheckNext("/^\\$?[0-9]+(\\.[0-9][0-9])?$/");
    }
}

module.exports = TOBUY