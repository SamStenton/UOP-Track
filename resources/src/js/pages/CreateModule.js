var Page = require('./Page.js')
var Form = require('../classes/Form.js')
var ModuleItemGen = require('../elements/ModuleItem.js')

class createModule extends Page{
    constructor() {
        super()
        this.selector = "create-module"
        this.submissions = []
        this.form = new Form({
            name: '',
            submissions: []
        });
        this.moduleItemFactory = new ModuleItemGen(this.getByDataAttr('item="items"'))
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
        this.getByName('module_name').addEventListener('keyup', (event) => {
            this.form.name = event.target.value
            this.updateDisplay('module_name', event)
        })
        this.getByID('addSubmission').addEventListener('click', (event) => this.addSubmission(event))
        this.getByID('submitForm').addEventListener('click', (event) => this.submitForm(event))
    }

    /**
     * Submits form to the server
     *
     * @param      {event}  event   Submit event
     */
    submitForm(event) {
        event.preventDefault();
        this.form.submissions = this.submissions;
        this.form.post('/api/module/create')
    }

    /**
     * Adds a submission to the form object 
     *
     * @param      {Event}  event   add event
     */
    addSubmission(event) {
        event.preventDefault();
        let item = {
            name: this.getByName('submission_name').value,
            weight: this.getByName('submission_weight').value,
            grade: this.getByName('submission_grade').value
        }

        this.moduleItemFactory.addItem(item)
        this.moduleItemFactory.generate();
        this.moduleItemFactory.inject();

        this.submissions.push(item)
        this.clearInputs(['submission_name', 'submission_weight', 'submission_grade'])
    }

    /**
     * Ouputs the users input in the the corrisponding Module Display
     *
     * @param      {String}  selector  Parent HTML selector
     * @param      {Event}  event     The event
     */
    updateDisplay(selector, event) {
        this.getByDataAttr(`item="${selector}"`).innerHTML = event.target.value
    }
}

module.exports = createModule;