const runTests = true;

if (runTests) {
    const ASTTests = require("./tests/ASTTests")
    const astTests = new ASTTests();
    astTests.runTests();
}