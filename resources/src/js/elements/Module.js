var ItemFactory = require('./ModuleItem.js')

class ModuleElement {
    constructor(itemContainer, withEditLinks = true) {
        this.container = itemContainer
        this.editLinks = withEditLinks
        this.items = new Array()
        this.generated = ""
        this.itemFactory = new ItemFactory(null, withEditLinks)
    }

    /**
     * Adds an item to the list of items
     *
     * @param      {Object}  item    The item
     */
    addItem(item) {
        this.items.push(item)
    }

    addModuleItem(item) {
        this.itemFactory.items.push(item)
    }

    /**
     * Generates an Module Submission html elements
     * using the template given from items passed
     * to the addItem method
     */
    generate(items = null) {
        if (items != null) {this.items = items}

        this.generated = ""
        for (let item in this.items) {
            item = this.items[item]
            this.itemFactory.generate(item.module_items)
            let editLink = this.editLinks ? '' : 'style="display: none;"'
            let string = `
            <div class="module" data-module-id="${item['id']}">
              <h3><span data-item="module_name">${item['name']}<span> <small>${item['module_items'].length} Items</small><span class="module-action"><a ${editLink} href="/module/${item['id']}/edit">Edit</a></span></h3>
              <div class="items">
                    ${this.itemFactory.inject()}
              </div>
              <div class="module-details">
                <div class="average">
                  ${item['moduleAverage']}%
                 <div>Running Average</div>
                </div>
                <div class="total">
                  ${item['moduleTotal']}%
                  <div>Module Total</div>
                </div>
              </div>
            </div>
            `

            this.generated += string.trim()
        }

    }

    /**
     * Inject the generated html into the given
     * HTML parent
     */
    inject() {
        if (this.container != null) {
            this.container.innerHTML = this.generated
        }
        return this.generated
    }

}

module.exports = ModuleElement