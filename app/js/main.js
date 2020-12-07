/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/main.js":
/*!********************!*
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawArea": () => /* binding */ drawArea,
/* harmony export */   "drawAreaWidth": () => /* binding */ drawAreaWidth,
/* harmony export */   "drawAreaHeight": () => /* binding */ drawAreaHeight,
/* harmony export */   "canvasBG": () => /* binding */ canvasBG,
/* harmony export */   "elementsCollection": () => /* binding */ elementsCollection,
/* harmony export */   "trashCollection": () => /* binding */ trashCollection
/* harmony export */ });
/* harmony import */ var _resize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resize.js */ "./js/resize.js");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/style.css */ "./css/style.css");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index.html */ "./index.html");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_html__WEBPACK_IMPORTED_MODULE_2__);


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




 // import '../scss/main.scss';

var drawArea = document.querySelector('.draw-area'),
    drawAreaWidth = drawArea.clientWidth,
    drawAreaHeight = drawArea.clientHeight,
    canvasBG = document.getElementById('canvas-bg'),
    // startScreen = document.querySelector('.start'),
// startButton = document.querySelector('.start__btn'),
elementsCollection = new Map(),
    trashCollection = new Map();
window.addEventListener('load', function () {
  (0,_resize_js__WEBPACK_IMPORTED_MODULE_0__.resizeCanvas)(canvasBG, drawArea);
  var elem = new Element(null, 0, 0, drawArea, elementsCollection).create();
  elem.move({
    clientX: drawArea.clientWidth / 2,
    clientY: elem.element.clientHeight / 2
  });
});

var resizeCanvasForListener = function resizeCanvasForListener() {
  return (0,_resize_js__WEBPACK_IMPORTED_MODULE_0__.resizeCanvas)(canvasBG, drawArea);
};

window.addEventListener('resize', function () {
  resizeCanvasForListener();
});
document.addEventListener('mousedown', function (event) {
  if (event.target.dataset.func === 'create') {
    var element = new Element(event.target.parentElement, event.clientX, event.clientY, drawArea, elementsCollection).create();
    var bindedElementMove = element.move.bind(element);
    document.addEventListener('mousemove', bindedElementMove);
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', bindedElementMove);
    });
  } else if (event.target.dataset.func === 'element') {
    var targetElement = elementsCollection.get(event.target.parentElement);

    var _bindedElementMove = targetElement.move.bind(targetElement);

    document.addEventListener('mousemove', _bindedElementMove);
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', _bindedElementMove);
    });
  }
});
document.addEventListener('click', function (event) {
  if (event.target.dataset.func === 'edit') {
    elementsCollection.get(event.target.parentElement).edit();
  } else if (event.target.dataset.func === 'remove') {
    elementsCollection.get(event.target.parentElement).remove();
  }
});

var Element = /*#__PURE__*/function () {
  function Element(parent, coordX, coordY, destination, collection) {
    _classCallCheck(this, Element);

    this.element = null;
    this.value = 'new';
    this.parent = parent;
    this.children = [];
    this.clientX = coordX;
    this.clientY = coordY;
    this.destination = destination;
    this.collection = collection;
    this.moveLimits = {
      top: 0,
      bottom: this.destination.clientHeight,
      left: 0,
      right: this.destination.clientWidth
    };
    this.htmlStructure = "<div class=\"element__text\" data-func=\"element\">".concat(this.value, "</div>") + '<input class="element__input hide" type="text"></input>' + '<div class="element__btn element__btn-remove" data-func="remove" title="remove">&#10008;</div>' + '<div class="element__btn element__btn-create" data-func="create" title="create">+</div>' + '<div class="element__btn element__btn-edit" data-func="edit" title="edit">&#9998;</div>' + '<div class="element__btn element__btn-info" data-func="info" title="info">i</div>';
  }

  _createClass(Element, [{
    key: "create",
    value: function create() {
      var newElement = document.createElement('div');
      newElement.classList.add('element');
      newElement.dataset.func = 'element';
      newElement.insertAdjacentHTML('beforeend', this.htmlStructure);
      this.element = newElement; //add to collection

      this.collection.set(this.element, this); //append to

      this.destination.append(this.element);
      this.addChildrenPropForParent(this.collection, this.parent);
      this.move(this);
      return this;
    }
  }, {
    key: "move",
    value: function move(_ref) {
      var clientX = _ref.clientX,
          clientY = _ref.clientY;
      var x = clientX - this.destination.offsetLeft - this.element.clientWidth / 2;
      var y = clientY - this.destination.offsetTop - this.element.clientHeight / 2;
      this.element.style.left = "".concat(Math.max(this.moveLimits.left, Math.min(this.moveLimits.right - this.element.clientWidth, x)), "px");
      this.element.style.top = "".concat(Math.max(this.moveLimits.top, Math.min(this.moveLimits.bottom - this.element.clientHeight, y)), "px");
      this.clientX = this.element.offsetLeft + this.element.clientWidth / 2;
      this.clientY = this.element.offsetTop + this.element.clientHeight / 2;
    }
  }, {
    key: "addChildrenPropForParent",
    value: function addChildrenPropForParent(collection, parent) {
      if (this.parent) collection.get(parent).children.push(this.element);
    }
  }, {
    key: "edit",
    value: function edit() {
      var input = this.element.querySelector('.element__input');
      var text = this.element.querySelector('.element__text');

      var btns = _toConsumableArray(this.element.querySelectorAll('.element__btn'));

      text.classList.add('hide');
      input.classList.remove('hide');
      btns.forEach(function (elem) {
        return elem.classList.add('hide');
      });
      input.focus();
      input.addEventListener('change', function () {
        text.textContent = input.value;
        input.value = '';
        text.classList.remove('hide');
        input.classList.add('hide');
        setTimeout(function () {
          return btns.forEach(function (elem) {
            return elem.classList.remove('hide');
          });
        }, 1000);
      }, {
        once: true
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this = this;

      if (this.collection.size <= 1) return;
      this.collection.get(this.parent).children = this.collection.get(this.parent).children.filter(function (child) {
        return child !== _this.element;
      });
      this.children.forEach(function (child) {
        return _this.collection.get(child).parent = 'deleted';
      });
      this.collection["delete"](this.element);
      this.element.remove();
    }
  }]);

  return Element;
}();

/***/ }),

/***/ "./js/resize.js":
/*!**********************!*
  !*** ./js/resize.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resizeCanvas": () => /* binding */ resizeCanvas,
/* harmony export */   "repositionElements": () => /* binding */ repositionElements
/* harmony export */ });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ "./js/main.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




function resizeCanvas(canvas, parentElement) {
  canvas.setAttribute('width', parentElement.clientWidth);
  canvas.setAttribute('height', parentElement.clientHeight);
}

function repositionElements() {
  var _this = this;

  _toConsumableArray(_main_js__WEBPACK_IMPORTED_MODULE_0__.elementsCollection.keys()).forEach(function (element) {
    _main_js__WEBPACK_IMPORTED_MODULE_0__.elementsCollection.get(element).clientX *= _main_js__WEBPACK_IMPORTED_MODULE_0__.drawAreaWidth / _main_js__WEBPACK_IMPORTED_MODULE_0__.drawArea.clientWidth;
    _main_js__WEBPACK_IMPORTED_MODULE_0__.elementsCollection.get(element).clientY *= _main_js__WEBPACK_IMPORTED_MODULE_0__.drawAreaHeight / _main_js__WEBPACK_IMPORTED_MODULE_0__.drawArea.clientHeight;
    _main_js__WEBPACK_IMPORTED_MODULE_0__.elementsCollection.get(element).move(_this);
  });
}

/***/ }),

/***/ "./index.html":
/*!********************!*
  !*** ./index.html ***!
  \********************/
/***/ ((module) => {

// Module
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title>Drag and drop</title>\r\n  <!-- <link rel=\"stylesheet\" href=\"style.css\"> -->\r\n</head>\r\n<body>\r\n  <div class=\"start hide\">\r\n    <button class=\"start__btn\">start</button>\r\n  </div>\r\n  <div class=\"container\">\r\n    <header class=\"header\">header</header>\r\n    <div class=\"structure\">\r\n      <div class=\"draw-area\">\r\n        <canvas class=\"canvas\" id=\"canvas-bg\"></canvas>\r\n      </div>\r\n      <div class=\"text-area\">\r\n        <h2>Structure</h2>\r\n      </div>\r\n    </div>\r\n    <footer class=\"footer\">footer</footer>\r\n  </div>\r\n  </div>\r\n  <!-- <script type=\"module\" src=\"./src/main.js\"></script> -->\r\n</body>\r\n</html>";
// Exports
module.exports = code;

/***/ }),

/***/ "./css/style.css":
/*!***********************!*
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./js/main.js");
/******/ })()
;
//# sourceMappingURL=main.js.map