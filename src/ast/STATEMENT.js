/**
 * Abstract Class STATEMENT
 *
 * @class STATEMENT
 */
class STATEMENT {
    constructor() {
        if (this.constructor === STATEMENT) {
            throw new Error("Abstract Class - Can't be instantiated")
        }
    }
}