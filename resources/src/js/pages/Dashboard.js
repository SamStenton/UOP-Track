var Page = require('./Page.js')
var ModuleFactory = require('../elements/Module.js')
var Modal = require('tingle.js');
var Form = require('../classes/Form.js')

class Dashboard extends Page{
    constructor() {
        super()
        this.selector = "dashboard"
        this.submissions = []
        this.modules = {}
        this.moduleFactory = new ModuleFactory(this.getByDataAttr('item="modules"'))
        this.itemForm = new Form({
            id: null,
            name: '',
            weighting: 0,
            grade: 0
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
        this.getRequest('api/modules').then(modules => {
            this.modules = modules
            this.insertModules()
        })
    }

    insertModules() {
        this.modules.forEach(module => {
            this.moduleFactory.addItem(module)
        })
        this.moduleFactory.generate()
        this.moduleFactory.inject()

        this.addEditEventListeners()
    }

    addEditEventListeners() {
        Array.from(this.getByClass('actions', false)).forEach(el => {
            el.addEventListener('click', event => this.editItem(event))
        })
    }

    editItem(event) {
        let itemId = event.target.parentElement.dataset.moduleItemId
        this.getRequest(`api/module/item/${itemId}`).then(item => {
            this.modal = this.createModal()
            this.modal.setContent(`
                <h1>Edit ${item.name}</h1>
                <div class="input-group">
                  <label for="name">Item Name</label>
                  <input type="text" name="name" value="${item.name}">
                </div>

                <div class="input-group">
                  <label for="weighting">Item weighting</label>
                  <input type="number" name="weighting" value="${item.weighting}">
                </div>

                <div class="input-group">
                  <label for="grade">Grade Recieved</label>
                  <input type="number" name="grade" value="${item.grade}">
                </div>
            `)
            this.modal.addFooterBtn('Save Item', 'tingle-btn tingle-btn--primary', event => {
                this.updateItem(itemId, this.modal.modalBoxContent)
                this.modal.close();
            });
            this.modal.open();
        })
    }

    updateItem(itemId, parent) {
        this.itemForm.id = itemId
        this.itemForm.name = this.getByName('name', parent).value
        this.itemForm.weighting = this.getByName('weighting', parent).value
        this.itemForm.grade = this.getByName('grade', parent).value

        this.itemForm.post(`api/module/item/${itemId}/update`).then(result => {
            this.moduleFactory = new ModuleFactory(this.getByDataAttr('item="modules"'))
            this.execute()
        })
    }
    createModal() {
        return new Modal.modal({
            footer: true,
            stickyFooter: false,
            closeLabel: "Close",
            onOpen: function() {},
            onClose: function() {},
            beforeClose: function() {return true; }
        })
    }

}

module.exports = Dashboard;