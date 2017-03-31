class ModuleItem {
    constructor(itemContainer, withEditLinks = true) {
        this.container = itemContainer
        this.items = new Array()
        this.generated = ""
        this.editLinks = withEditLinks
    }

    /**
     * Adds an item to the list of items
     *
     * @param      {Object}  item    The item
     */
    addItem(item) {
        this.items.push(item)
    }

    /**
     * Generates an Module Submission html elements
     * using the template given from items passed
     * to the addItem method
     */
    generate(items = null) {
        if (items != null) {this.items = items}
        this.generated = ""
        let editLink = this.editLinks ? '' : 'style="display: none;"'
        for (let item in this.items) {
            item = this.items[item]
            let grade = (item.grade != "") ? `${item.grade}%` : 'Pending'
            let string = `
                <div class="item" data-module-item-id="${item['id']}">
                  <div class="type">?</div>
                  <div class="details">
                    <h4>${item.name}</h4>
                    <div class="weighting">Weighting: ${item.weighting}%</div>
                  </div>
                  <div class="grade ${grade}">${grade}</div>
                  <div class="actions" ${editLink}>Edit</div>
                </div>`

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

module.exports = ModuleItem

