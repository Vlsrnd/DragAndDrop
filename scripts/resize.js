import {drawArea, drawAreaWidth, drawAreaHeight, canvasBG, elementsCollection} from './main.js';
export {resizeCanvas, repositionElements};

function resizeCanvas() {
  canvasBG.setAttribute('width', drawArea.clientWidth);
  canvasBG.setAttribute('height', drawArea.clientHeight);
}

function repositionElements() {
  [...elementsCollection.keys()].forEach(element => {
    elementsCollection.get(element).clientX *= drawAreaWidth / drawArea.clientWidth;
    elementsCollection.get(element).clientY *= drawAreaHeight / drawArea.clientHeight;
    elementsCollection.get(element).move(this);
  })
}