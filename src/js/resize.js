import {drawArea, drawAreaWidth, drawAreaHeight, canvasBG, elementsCollection} from './main.js';
export {resizeCanvas, repositionElements};

function resizeCanvas(canvas, parentElement) {
  canvas.setAttribute('width', parentElement.clientWidth);
  canvas.setAttribute('height', parentElement.clientHeight);
}

function repositionElements() {
  [...elementsCollection.keys()].forEach(element => {
    elementsCollection.get(element).clientX *= drawAreaWidth / drawArea.clientWidth;
    elementsCollection.get(element).clientY *= drawAreaHeight / drawArea.clientHeight;
    elementsCollection.get(element).move(this);
  })
}