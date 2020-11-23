import {drawArea, canvasBG} from './main.js';
export {resizeCanvas};

function resizeCanvas() {
  // canvasBG.style.position = 'absolute';
  // canvasBG.style.top = 0;
  // canvasBG.style.left = 0;
  canvasBG.setAttribute('width', drawArea.clientWidth);
  canvasBG.setAttribute('height', drawArea.clientHeight);
}