
class PORTFOLIOTAG {
    portfolioTag;

    setTag(name) {
        this.portfolioTag = name;
    }

    parse() {
        this.setTag(tokenizer.getAndCheckNext("[a-z]+/ig"));
    }
}

module.exports = PORTFOLIOTAG