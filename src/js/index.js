'use strict';
import {resizeCanvas, repositionElements} from './resize.js';
import '../css/style.css';
import '../index.html';
import { createElement } from './create-element.js';
import { htmlStructure } from './element-structure.js';
import { addToCollection } from './add-to-collection.js';
import { moveElement } from './move-element.js';
import { editText } from './edit-text.js';
import { removeElement } from './remove-element.js';
import { getElementsCoordinate } from './get-elements-coordinate.js';
import { drawLinesOnCanvas } from './draw-lines-on-canvas.js';
import { drawModeFunction } from './draw-mode-function.js';
// import '../scss/main.scss';

const drawArea = document.querySelector('.draw-area'),
      canvasBG = document.getElementById('canvas-bg'),
      ctxBG = canvasBG.getContext('2d'),
      canvasDraw = document.getElementById('canvas-draw'),
      ctxDraw = canvasDraw.getContext('2d'),
      instruments = document.querySelector('.instruments'),
      lastDrawAreaSize = {width: drawArea.clientWidth, height: drawArea.clientHeight},
      elementsCollection = [],
      trashCollection = [],
      elementsCoordinate = [],
      drawModeCoordinate = [];
let drawMode = false;


//temporary
window.elementsCollection = elementsCollection;
window.trashCollection = trashCollection;
window.elementsCoordinate = elementsCoordinate;
window.drawModeCoordinate = drawModeCoordinate;
//

const redrawAreaComposition = () => {
  elementsCoordinate.length = 0;
  elementsCoordinate.push(...getElementsCoordinate(elementsCollection));
  drawLinesOnCanvas(canvasBG, ctxBG, elementsCoordinate);
};


window.addEventListener('load', () => {
  resizeCanvas(canvasBG, drawArea);
  resizeCanvas(canvasDraw, drawArea);
  const element = createElement(htmlStructure);
  drawArea.append(element);
  addToCollection(element, elementsCollection)
  moveElement(element, 
              {clientX: drawArea.clientWidth / 2, clientY: 10},
              drawArea);
})
//create, move
document.addEventListener('mousedown', event => {
  if (event.target.dataset.func === 'create'){
    const parent = event.target.parentElement;
    const element = createElement(htmlStructure);
    drawArea.append(element);
    moveElement(element, event, drawArea);
    addToCollection(element, elementsCollection, parent);
    const moveNewElement = (event) => {
      moveElement(element, event, drawArea)
      redrawAreaComposition();
    };
    document.addEventListener('mousemove', moveNewElement);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveNewElement);
    })
  } else if (event.target.dataset.func === 'element') {
    const targetElement = event.target.parentElement;
    const moveCurrentElement = (event) => {
      moveElement(targetElement, event, drawArea)
      redrawAreaComposition();
    };
    document.addEventListener('mousemove', moveCurrentElement);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveCurrentElement);

    })
  }
})
//resize
+function () {
  window.addEventListener('resize', resizeThrottler, false);
  let resizeTimeout;
  function resizeThrottler() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        // resize handler start
        resizeCanvas(canvasBG, drawArea);
        resizeCanvas(canvasDraw, drawArea);
        repositionElements(elementsCollection, lastDrawAreaSize, drawArea);
        redrawAreaComposition();
        // end
      }, 30)
    }
  }
}();
//edit, remove
document.addEventListener('click', event => {
  if (event.target.dataset.func === 'edit'){
    editText(event.target.parentElement);
  } else if (event.target.dataset.func === 'remove'){
    const trash = removeElement(event.target.parentElement, elementsCollection);
    trashCollection.push(trash);
    redrawAreaComposition();
  }
})

//restore ctrl+z
document.addEventListener('keydown', event => {
  if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    if (trashCollection.length > 0){
      const lastTrash = trashCollection.pop();
      lastTrash.deletedElements.forEach(element => {
        element.classList.remove('hide');
        element.dataset.deleted = 'false';
      })
      redrawAreaComposition();
    } else {
      alert('trash basket is empty')
    }
  }
});

//drawMode start

const drawModeComposition = event => {
  drawModeCoordinate.push([event.clientX - drawArea.offsetLeft,
                          event.clientY - drawArea.offsetTop]);
};
const redraw = () => {
  drawModeFunction(canvasDraw, ctxDraw, drawModeCoordinate);
  setTimeout(redraw, 50);  
}

const drawModeOn = () => {
  drawModeCoordinate.push('start');
  drawArea.addEventListener('mousemove', drawModeComposition);
};
const drawModeOff = () => {
  drawModeCoordinate.push('stop');
  drawArea.removeEventListener('mousemove', drawModeComposition);
};

window.requestAnimationFrame(redraw);

instruments.addEventListener('click', event => {
  if (event.target.dataset.btn === 'draw-mode') {
    if (!drawMode) {
      drawMode = true;
      drawArea.addEventListener('mousedown', drawModeOn);
      drawArea.addEventListener('mouseup', drawModeOff);
    } else if (drawMode) {
      drawMode = false;
      drawArea.removeEventListener('mousedown', drawModeOn);
      drawArea.removeEventListener('mouseup', drawModeOff);
    }
  }
})

//drawMode end