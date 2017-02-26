/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_storage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_pages__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_pages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_pages__);



var store = new __WEBPACK_IMPORTED_MODULE_0__components_storage___default.a();
var pages = new __WEBPACK_IMPORTED_MODULE_1__components_pages___default.a();

pages.collect();

var step1 = document.getElementById('step-1');
var currentForm = step1;

step1.style.display = "block";

Array.from(document.getElementsByClassName('next-page')).forEach(function (button) {
    button.addEventListener('click', storeValues);
});
window.addEventListener('popstate', function (event) {
    if (currentForm !== step1) {
        event.preventDefault();
    }
    changePage(true);
});

function changePage() {
    var back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


    var currentFormID = parseInt(currentForm.id.split('-')[1]);
    var nextFormID = currentFormID + 1;
    if (back) {
        nextFormID = currentFormID - 1;
    }

    var nextForm = document.getElementById('step-' + nextFormID);

    currentForm.style.display = "none";
    nextForm.style.display = "block";

    currentForm = nextForm;
    history.pushState({}, null, '#!' + currentForm.id);
}

function storeValues(event) {
    var inputs = Array.from(currentForm.getElementsByTagName('input'));
    inputs.forEach(function (input) {
        if (input.type == 'radio') {
            if (input.checked) {
                store.push(input.name, input.value);
                // store[input.name] = input.value
            }
        } else {
            // store[input.name] = input.value
            store.push(input.name, input.value);
        }
    });

    changePage();
    console.log(store.data);
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storage = function () {
    function storage() {
        _classCallCheck(this, storage);

        this.store = {};
    }

    _createClass(storage, [{
        key: "push",
        value: function push(key, value) {
            this.store[key] = value;
        }
    }, {
        key: "data",
        get: function get() {
            return this.store;
        }
    }]);

    return storage;
}();

module.exports = storage;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pages = function () {
    function pages() {
        _classCallCheck(this, pages);

        this.pages = {};
        this.current = null;
    }

    _createClass(pages, [{
        key: 'setCurrent',
        value: function setCurrent(newCurrent) {
            this.current = newCurrent;
        }
    }, {
        key: 'collect',
        value: function collect() {
            this.pages = document.getElementsByTagName('main');
            this.setCurrent(this.pages[0]);
        }
    }, {
        key: 'list',
        get: function get() {
            return this.pages;
        }
    }]);

    return pages;
}();

module.exports = pages;

/***/ })
/******/ ]);