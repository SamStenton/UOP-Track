class pages {
    constructor() {
        this.pages = {};
        this.current = null;
    }

    get list() {
        return this.pages;
    }

    setCurrent(newCurrent) {
        this.current = newCurrent;
    }

    collect() {
        this.pages = document.getElementsByTagName('main');
        this.setCurrent(this.pages[0])
    }

}

module.exports = pages