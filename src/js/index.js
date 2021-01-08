'use strict';
import { resizeCanvas, repositionElements } from './common/resize.js';
import '../css/style.css';
import '../index.html';
import { createElement } from './create-element/create-element.js';
import { htmlStructure } from './create-element/element-structure.js';
import { addToCollection } from './create-element/add-to-collection.js';
import { moveElement } from './main-element-function/move-element.js';
import { editText } from './main-element-function/edit-text.js';
import { removeElement } from './main-element-function/remove-element.js';
import { getElementsCoordinate } from './draw-line/get-elements-coordinate.js';
import { drawLinesOnCanvas } from './draw-line/draw-lines-on-canvas.js';
import { mainSettings } from './store/main-settings.js';
import { store } from './store/store.js';
import { settingsInit } from './settings-functional/settings-init';
import { hideSettings } from './settings-functional/hide-settings';
import { drawModeOff, drawModeOn } from './draw-mode/draw-mode-init.js';

const drawArea = document.querySelector('.draw-area'),
  settingsElement = document.querySelector('.settings'),
  drawAreaBG = document.querySelector('.draw-area__bg'),
  canvasBG = document.getElementById('canvas-bg'),
  ctxBG = canvasBG.getContext('2d'),
  canvasDraw = document.getElementById('canvas-draw'),
  { elementsCollection, trashCollection, elementsCoordinate } = store;

const redrawLineForSubscriber = () => drawLinesOnCanvas(canvasBG, ctxBG, elementsCoordinate, mainSettings);
mainSettings.subscribe('redraw', redrawLineForSubscriber);

//temporary
window.drawAreaBG = drawAreaBG;
window.store = store;
window.mainSettings = mainSettings;
//

const redrawAreaComposition = () => {
  elementsCoordinate.length = 0;
  elementsCoordinate.push(...getElementsCoordinate(elementsCollection));
  drawLinesOnCanvas(canvasBG, ctxBG, elementsCoordinate, mainSettings);
};

window.addEventListener('load', () => {
  resizeCanvas(canvasBG, drawArea);
  resizeCanvas(canvasDraw, drawArea);
  const element = createElement(htmlStructure);
  element.ondragstart = () => false;
  drawArea.append(element);
  addToCollection(element, elementsCollection)
  moveElement(element, {
      clientX: drawArea.clientWidth / 2,
      clientY: 10
    },
    drawArea);
  settingsInit();
})

//create, move
document.addEventListener('mousedown', event => {
  if (mainSettings.isDrawMode) return;
  if (event.target.dataset.func === 'create' || event.target.dataset.btn === 'new-element') {
    const parent = event.target.dataset.func === 'create' ? event.target.parentElement : null;
    const element = createElement(htmlStructure);
    drawArea.append(element);
    element.ondragstart = () => false;
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

//edit, remove
document.addEventListener('click', event => {
  if (mainSettings.isDrawMode) return;
  if (event.target.dataset.func === 'edit') {
    editText(event.target.parentElement);
  } else if (event.target.dataset.func === 'remove') {
    const trash = removeElement(event.target.parentElement, elementsCollection);
    trashCollection.push(trash);
    redrawAreaComposition();
  }
})

//restore ctrl+z
document.addEventListener('keydown', event => {
  if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey) && !mainSettings.isDrawMode) {
    if (trashCollection.length > 0) {
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

//resize
const lastDrawAreaSize = {
  width: drawArea.clientWidth,
  height: drawArea.clientHeight
};
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

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    mainSettings.isDrawMode = false;
    drawArea.removeEventListener('mousedown', drawModeOn);
    drawArea.removeEventListener('mouseup', drawModeOff);
    hideSettings(settingsElement);
  }
});