'use strict';
import {resizeCanvas, repositionElements} from './resize.js';
import '../css/style.css';
import '../index.html';
import { createElement } from './create-element.js';
import { htmlStructure } from './element-structure.js';
import { addToCollection } from './add-to-collection.js';
import { moveElement } from './move-element.js';
import { editText } from './edit-text.js';
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

document.addEventListener('click', event => {
  if (event.target.dataset.func === 'edit'){
    editText (event.target.parentElement);
  } else if (event.target.dataset.func === 'remove'){
    // elementsCollection.get(event.target.parentElement).remove();
  }
})

+function () {
  window.addEventListener('resize', resizeThrottler, false);
  let resizeTimeout;
  function resizeThrottler() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        // resize handler start
        resizeCanvas(canvasBG, drawArea);
        repositionElements(elementsCollection, lastDrawAreaSize, drawArea);
        // end
      }, 30)
    }
  }
}();



// document.addEventListener('click', event => {
//   if (event.target.dataset.func === 'edit'){
//     elementsCollection.get(event.target.parentElement).edit();
//   } else if (event.target.dataset.func === 'remove'){
//     elementsCollection.get(event.target.parentElement).remove();
//   }
// })


//   remove(){
//     if (this.collection.size <= 1) return;
//     this.collection.get(this.parent).children = this.collection.get(this.parent).children
//                                                      .filter(child => child !== this.element);
//     this.children.forEach(child => this.collection.get(child).parent = 'deleted');
//     this.collection.delete(this.element);
//     this.element.remove();
//   }
// }


