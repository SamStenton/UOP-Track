var Page = require('./Page.js')

class Dashboard extends Page{
    constructor() {
        super()
        this.selector = "dashboard"
        this.submissions = []
        this.modules = {}
    }

    /**
     * Checks for a unique element on a page to 
     *
     * @return     {boolean}  True if able to fulfill, False otherwise.
     */
    canFulfill() {
        return document.querySelectorAll(`[data-page="${this.selector}"]`).length > 0;
    }

    /**
     * Entry Method for the current page. Envoked via PageDispatcher.js
     * 
     */
    execute() {
        this.getRequest('api/modules').then(modules => {
            console.log(modules)
        })
    }

}

module.exports = Dashboard;