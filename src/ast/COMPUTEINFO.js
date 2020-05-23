
class COMPUTEINFO {

    parse() {
        tokenizer.getAndCheckNext("compute");
        let c = new COMMAND();
        c.parse();
    }
}