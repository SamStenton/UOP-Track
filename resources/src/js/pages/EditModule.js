var Page = require('./Page.js')
var ModuleFactory = require('../elements/Module.js')
var Modal = require('tingle.js');
var Form = require('../classes/Form.js')

class EditModule extends Page{
    constructor() {
        super()
        this.selector = "edit-module"
        this.submissions = []
        this.moduleId = null;
        this.module = null;
        this.moduleFactory = new ModuleFactory(this.getByDataAttr('item="module"'), false)
        this.form = new Form({
            id: null,
            name: '',
            submissions: []
        });

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
        // Get module to edit
        this.moduleId = this.getByDataAttr('itemId').dataset.itemid

        this.getRequest(`/api/module/${this.moduleId}`).then(module => {
            this.module = module
            this.getByName('module_name').value = module.name
            this.submissions = module.module_items
            this.form.name = module.name
            this.form.id = module.id
            this.populateDisplay(module)
            this.addEventListeners()
        })
    }

    /**
     * Sets the inital items that are editable
     * by the user
     *
     * @param      {Moduel}  module  The module
     */
    populateDisplay(module) {
        this.moduleFactory.generate([module])
        this.moduleFactory.inject()
    }

    /**
     * Adds event listeners.
     */
    addEventListeners() {
        this.getByName('module_name').addEventListener('keyup', (event) => {
            this.form.name = event.target.value
            this.module.name = event.target.value
            this.updateDisplay('module_name', event)
        })
        this.getByID('addSubmission').addEventListener('click', (event) => this.addSubmission(event))
        this.getByID('submitForm').addEventListener('click', (event) => this.submitForm(event))
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

    /**
     * Adds a submission to the form object 
     *
     * @param      {Event}  event   add event
     */
    addSubmission(event) {
        event.preventDefault();
        let item = {
            name: this.getByName('submission_name').value,
            weighting: this.getByName('submission_weight').value,
            grade: this.getByName('submission_grade').value
        }

        this.moduleFactory.addModuleItem(item)
        this.module.module_items = this.submissions
        this.moduleFactory.generate([this.module]);
        this.moduleFactory.inject();

        this.clearInputs(['submission_name', 'submission_weight', 'submission_grade'])
    }

    /**
     * Submits form to the server
     *
     * @param      {event}  event   Submit event
     */
    submitForm(event) {
        event.preventDefault();
        this.form.submissions = this.submissions;
        this.form.post(`/api/module/${this.moduleId}/update`).then(data => {
            window.location = "/"
        })
    }
}

module.exports = EditModule;