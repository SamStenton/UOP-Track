var Form = require('../classes/Form.js')
var form = new Form();

class Page {
    constructor() {
        this.selector = undefined
    }

    /**
     * This is basically and abstract class so shouldn't
     * have the ability to fulfill any requests
     *
     * @return     {boolean}  True if able to fulfill, False otherwise.
     */
    canFulfill() {
        return false;
    }

    /**
     * Entry into page. Should be overridden
     */
    execute() {console.log('execute() method does not exist. Please create it')}

    /**
     * Gets an element by its ID
     *
     * @param      {string}  id      ID of element
     * @return     {HTMLElement}  Selected element 
     */
    getByID(id) {
        return document.querySelectorAll(`[id="${id}"]`)[0]
    }

    /**
     * Gets an element by its name
     * This would usually be 
     * an input
     *
     * @param      {string}  name    Input Name
     * @return     {HtmlElement}  Selected element
     */
    getByName(name) {
        return document.querySelectorAll(`[name="${name}"]`)[0]
    }

    /**
     * Selects an element by its class name
     *
     * @param      {String}  name    Class name 
     * @return     {HMTLElement}  Selected element
     */ 
    getByClass(name) {
        return document.querySelectorAll(`[class="${name}"]`)[0]
    }

    /**
     * Selects element by its Data attribute
     *
     * @param      {String}  name    Data attribute
     * @return     {HTMLElement}  Selected element
     */
    getByDataAttr(name) {
        return document.querySelectorAll(`[data-${name}`)[0]
    }

    /**
     * Clears an inputs value
     *
     * @param      {String}  name    Inputs name
     */
    clearInput(name) {
        this.getByName(name).value = ""
    }

    /**
     * Clears multiple input values
     *
     * @param      {Array}  inputs  The inputs
     */
    clearInputs(inputs) {
        for(let input in inputs) {
            this.clearInput(inputs[input])
        }
    }
}

module.exports = Page;