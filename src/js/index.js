'use strict';
import {resizeCanvas, repositionElements} from './resize.js';
import '../css/style.css';
import '../index.html';
import { createElement } from './create-element.js';
import { htmlStructure } from './element-structure.js';
import { addToCollection } from './add-to-collection.js';
import { moveElement } from './move-element.js';
// import '../scss/main.scss';

const drawArea = document.querySelector('.draw-area'),
      canvasBG = document.getElementById('canvas-bg'),
      lastDrawAreaSize = {width: drawArea.clientWidth, height: drawArea.clientHeight},
      elementsCollection = [];
//temporary
window.elementsCollection = elementsCollection;
//
window.addEventListener('load', () => {
  resizeCanvas(canvasBG, drawArea);
  const element = createElement(htmlStructure);
  drawArea.append(element);
  addToCollection(element, elementsCollection)
  moveElement(element, 
              {clientX: drawArea.clientWidth / 2, clientY: 10},
              drawArea);
})

document.addEventListener('mousedown', event => {
  if (event.target.dataset.func === 'create'){
    const parent = event.target.parentElement;
    const element = createElement(htmlStructure);
    drawArea.append(element);
    moveElement(element, event, drawArea);
    addToCollection(element, elementsCollection, parent);

    const moveNewElement = (event) => {
      moveElement(element, event, drawArea)
    };
    document.addEventListener('mousemove', moveNewElement);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveNewElement);
    })
  } else if (event.target.dataset.func === 'element') {
    const targetElement = event.target.parentElement;
    const moveCurrentElement = (event) => {
      moveElement(targetElement, event, drawArea)
    };
    document.addEventListener('mousemove', moveCurrentElement);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveCurrentElement);
    })
  }
})

//resize block
+function () {
  window.addEventListener('resize', resizeThrottler, false);
  let resizeTimeout;
  function resizeThrottler() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        resizeCanvas(canvasBG, drawArea);
        repositionElements(elementsCollection, lastDrawAreaSize, drawArea);
      }, 30)
    }
  }
}();
// window.requestAnimationFrame(resizeWindow);

// window.addEventListener('resize', () => {
//   resizeCanvas(canvasBG, drawArea);
//   repositionElements(elementsCollection, lastDrawAreaSize,
//                      drawArea, moveElement);
// });




// document.addEventListener('click', event => {
//   if (event.target.dataset.func === 'edit'){
//     elementsCollection.get(event.target.parentElement).edit();
//   } else if (event.target.dataset.func === 'remove'){
//     elementsCollection.get(event.target.parentElement).remove();
//   }
// })

// class Element {
//   constructor(parent, coordX, coordY, destination, collection){
//     this.element = null;
//     this.value = 'new';
//     this.parent = parent;
//     this.children = [];
//     this.clientX = coordX;
//     this.clientY = coordY;
//     this.destination = destination;
//     this.collection = collection;
//     this.moveLimits = {
//       top: 0,
//       bottom: this.destination.clientHeight,
//       left: 0,
//       right: this.destination.clientWidth,
//     };
//     this.htmlStructure = `<div class="element__text" data-func="element">${this.value}</div>`
//                         +'<input class="element__input hide" type="text"></input>'
//                         +'<div class="element__btn element__btn-remove" data-func="remove" title="remove">&#10008;</div>'
//                         +'<div class="element__btn element__btn-create" data-func="create" title="create">+</div>'
//                         +'<div class="element__btn element__btn-edit" data-func="edit" title="edit">&#9998;</div>'
//                         +'<div class="element__btn element__btn-info" data-func="info" title="info">i</div>';
//   }
//   create() {
//     const newElement = document.createElement('div');
//     newElement.classList.add('element');
//     newElement.dataset.func = 'element';
//     newElement.insertAdjacentHTML('beforeend', this.htmlStructure);
//     this.element = newElement;
//     //add to collection
//     this.collection.set(this.element, this);
//     //append to
//     this.destination.append(this.element);
//     this.addChildrenPropForParent(this.collection, this.parent)
//     this.move(this);
//     return this; 
//   }

//   move({clientX, clientY} = this) {
//     const x = clientX - this.destination.offsetLeft - this.element.clientWidth / 2;
//     const y = clientY - this.destination.offsetTop - this.element.clientHeight / 2;
//     this.element.style.left = `${Math.max(this.moveLimits.left, Math.min(this.moveLimits.right - this.element.clientWidth, x))}px`;
//     this.element.style.top = `${Math.max(this.moveLimits.top, Math.min(this.moveLimits.bottom - this.element.clientHeight, y))}px`;
//     this.clientX = this.element.offsetLeft + this.element.clientWidth / 2;
//     this.clientY = this.element.offsetTop + this.element.clientHeight / 2;
//   }

//   addChildrenPropForParent(collection, parent){
//     if (this.parent) collection.get(parent).children.push(this.element);
//   }
//   edit(){
//     const input = this.element.querySelector('.element__input');
//     const text = this.element.querySelector('.element__text');
//     const btns = [...this.element.querySelectorAll('.element__btn')];
//     text.classList.add('hide');
//     input.classList.remove('hide');
//     btns.forEach(elem => elem.classList.add('hide'));
//     input.focus();
//     input.addEventListener('change', () => {
//       text.textContent = input.value;
//       input.value = '';
//       text.classList.remove('hide');
//       input.classList.add('hide');
//       setTimeout(() => btns.forEach(elem => elem.classList.remove('hide')), 1000);
//     }, {once: true})
//   }

//   remove(){
//     if (this.collection.size <= 1) return;
//     this.collection.get(this.parent).children = this.collection.get(this.parent).children
//                                                      .filter(child => child !== this.element);
//     this.children.forEach(child => this.collection.get(child).parent = 'deleted');
//     this.collection.delete(this.element);
//     this.element.remove();
//   }
// }


