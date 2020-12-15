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
import { createGradient } from './create-gradient.js';
import { selectColor } from './select-color.js';
// import '../scss/main.scss';

const drawArea = document.querySelector('.draw-area'),
      drawAreaBG = document.querySelector('.draw-area__bg'),
      canvasBG = document.getElementById('canvas-bg'),
      ctxBG = canvasBG.getContext('2d'),
      canvasDraw = document.getElementById('canvas-draw'),
      ctxDraw = canvasDraw.getContext('2d'),
      colorsPalette = document.getElementById('canvas-palette'),
      colorsPaletteCTX = colorsPalette.getContext('2d'),
      colorsPaletteMarker = document.querySelector('.colors__palette-marker'),
      colorsExample = document.querySelector('.colors__example'),
      instruments = document.querySelector('.instruments'),
      drawModeSettingsElement = document.querySelector('.draw-mode__settings'),
      exampleLine = document.getElementById('example-line'),
      lastDrawAreaSize = {width: drawArea.clientWidth, height: drawArea.clientHeight},
      elementsCollection = [],
      trashCollection = [],
      elementsCoordinate = [],
      mainSettings = {
        color: 'red',
        lineWidth: 10,
        _colorBG: '#FFF',
        set colorBG(value) { 
          this._colorBG = value;
          console.log(this.colorBG);
          drawAreaBG.style.backgroundColor = this._colorBG;
        },
        get colorBG() { return this._colorBG },
        redraw: () => drawLinesOnCanvas(canvasBG, ctxBG, elementsCoordinate, mainSettings),
        changeProp(obj) {
          if (!this[obj.prop]) {
            console.log('Wrong input. Need {prop: propName, value: value}');
            return false;
          }
          this[obj.prop] = obj.value
          this.redraw();
          return true;
        },
      },
      drawModeCoordinate = [],
      drawModeSettings = {
        color: '#000',
        lineWidth: 1,
      };
let drawMode = false;


//temporary
window.drawAreaBG = drawAreaBG;
window.elementsCollection = elementsCollection;
window.trashCollection = trashCollection;
window.elementsCoordinate = elementsCoordinate;
window.drawModeCoordinate = drawModeCoordinate;
window.drawModeSettings = drawModeSettings;
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
  drawArea.append(element);
  addToCollection(element, elementsCollection)
  moveElement(element, 
              {clientX: drawArea.clientWidth / 2, clientY: 10},
              drawArea);
  createGradient(colorsPalette, colorsPaletteCTX);
})

const selectColorForListener = (event) => {
  selectColor(event, 
              colorsPalette, 
              colorsPaletteCTX, 
              colorsExample, 
              drawModeSettings, 
              colorsPaletteMarker)
};
colorsPalette.parentElement.addEventListener('mousedown', event => {
  selectColorForListener(event);
  colorsPalette.addEventListener('mousemove', selectColorForListener);
})
colorsPalette.parentElement.addEventListener('mouseup', event => {
  colorsPalette.removeEventListener('mousemove', selectColorForListener);
})
//create, move
document.addEventListener('mousedown', event => {
  if (drawMode) return;
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
  if (drawMode) return;
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
  if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey) && !drawMode) {
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

const addDrawModeCoordinate = event => {
  drawModeCoordinate.push([event.clientX - drawArea.offsetLeft,
                          event.clientY - drawArea.offsetTop]);
  requestAnimationFrame(redraw);
};
const redraw = () => {
  console.log('draw')
  drawModeFunction(canvasDraw, ctxDraw, drawModeCoordinate);
}
const drawModeOn = () => {
  drawModeCoordinate.push(drawModeSettings);
  drawArea.addEventListener('mousemove', addDrawModeCoordinate);
};
const drawModeOff = () => {
  drawArea.removeEventListener('mousemove', addDrawModeCoordinate);
};

window.requestAnimationFrame(redraw);

instruments.addEventListener('click', event => {
  if (event.target.dataset.btn === 'draw-mode') {
    if (!drawMode) {
      drawMode = true;
      drawModeSettingsElement.style.top = '0px';
      drawArea.addEventListener('mousedown', drawModeOn);
      drawArea.addEventListener('mouseup', drawModeOff);
    } else if (drawMode) {
      drawMode = false;
      drawModeSettingsElement.style.top = '-40px';
      drawArea.removeEventListener('mousedown', drawModeOn);
      drawArea.removeEventListener('mouseup', drawModeOff);
    }
  }
})

drawModeSettingsElement.addEventListener('click', event => {
  if (event.target.dataset.color) {
    const color = event.target.dataset.color;
    drawModeSettings.color = color;
    exampleLine.style.borderColor = color;
  }

})
//drawMode end