class storage {
    constructor() {
        this.store = {};
    }

    get data() {
        return this.store;
    }

    push(key, value) {
        this.store[key] = value
    }
}

module.exports = storage