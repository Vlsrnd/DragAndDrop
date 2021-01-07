import { drawModeFunction } from './draw-mode-function.js';
import { store } from '../store/store';
import { mainSettings } from '../store/main-settings.js';
const canvasDraw = document.getElementById('canvas-draw'),
  ctxDraw = canvasDraw.getContext('2d'),
  drawArea = document.querySelector('.draw-area'),
  drawModeCoordinate = store.drawModeCoordinate;

const redraw = () => drawModeFunction(ctxDraw, drawModeCoordinate);
const addDrawModeCoordinate = event => {
  drawModeCoordinate.push([event.clientX - drawArea.offsetLeft,
    event.clientY - drawArea.offsetTop
  ]);
  requestAnimationFrame(redraw);
};
window.requestAnimationFrame(redraw);

export const drawModeOn = () => {
  drawModeCoordinate.push({
    color: mainSettings.drawMode.color,
    lineWidth: mainSettings.drawMode.lineWidth,
  });
  drawArea.addEventListener('mousemove', addDrawModeCoordinate);
};
export const drawModeOff = () => {
  drawArea.removeEventListener('mousemove', addDrawModeCoordinate);
};