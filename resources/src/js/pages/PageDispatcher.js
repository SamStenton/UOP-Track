
class PageDispatcher {
    constructor() {
        this.pages = this.registerPages();
        this.loadPage()
    }

    /**
     * Pages to be checked should be placed here
     *
     * @return     {Object}  Pages Classes
     */
    registerPages() {
        return [
            './Dashboard.js',
            './CreateModule.js'
        ]
    }

    /**
     * Loops through the registered pages 
     * checking if each can fulfill the
     * current page. If so the execute
     * method is run on the returned
     * Page
     */
    loadPage() {
        for(let page in this.pages) {
            page = new (require(this.pages[page]))
            if (page.canFulfill()) {
                page.execute()
                console.log(page.selector + ' module loaded')
                break;
            }
        }
    }
}

module.exports = PageDispatcher