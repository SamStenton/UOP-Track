var CreateModulePage = require('./CreateModule.js');

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
        return {
            CreateModulePage: new CreateModulePage()
        }
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
            if (this.pages[page].canFulfill()) {
                this.pages[page].execute()
                break;
            }
        }
    }
}

module.exports = PageDispatcher