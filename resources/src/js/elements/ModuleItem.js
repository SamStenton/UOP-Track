class ModuleItem {
    constructor(itemContainer) {
        this.container = itemContainer
        this.items = new Array()
        this.generated = ""
        this.container.innerHTML = ""
    }

    addItem(item) {
        this.items.push(item)
    }

    generate() {
        this.generated = ""
        for (let item in this.items) {
            item = this.items[item]
            let grade = (item.grade != "") ? `${item.grade}%` : 'Pending'
            let string = `
                <div class="item">
                  <div class="type">?</div>
                  <div class="details">
                    <h4>${item.name}</h4>
                    <div class="weighting">Weighting: ${item.weight}%</div>
                  </div>
                  <div class="grade pending">${grade}</div>
                </div>`

            this.generated += string.trim()
        }

    }

    inject() {
        this.container.innerHTML = this.generated
    }
}

module.exports = ModuleItem

