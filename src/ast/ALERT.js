
class ALERT {

    parse() {
        this.alertOn = null;

        this.alertOn = tokenizer.getAndCheckNext("TRUE | FALSE");
    }
}

module.exports = ALERT