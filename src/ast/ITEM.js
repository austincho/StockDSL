/**
 * Abstract Class ITEM
 *
 * @class ITEM
 */
class ITEM {
    constructor() {
        if (this.constructor === ITEM) {
            throw new Error("Abstract Class - Can't be instantiated")
        }
    }
}