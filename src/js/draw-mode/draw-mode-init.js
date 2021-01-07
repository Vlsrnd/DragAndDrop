import { drawModeFunction } from './draw-mode-function.js';
import { selectColor } from './select-color.js';
import { updateExampleLine } from './update-example-line.js';
import { slide } from './slide-line-width.js';
import { createGradient } from './create-gradient.js';
import { mainSettings } from '../store/main-settings.js';

export const canvasDraw = document.getElementById('canvas-draw');

const ctxDraw = canvasDraw.getContext('2d');

export let drawMode = false;

export const drawModeInit = () => {
  const colorsPaletteCanvas = document.getElementById('canvas-palette'),
  colorsPaletteCTX = colorsPaletteCanvas.getContext('2d'),
  drawArea = document.querySelector('.draw-area'),
  header = document.querySelector('.header'),
  drawModeSettingsElement = document.querySelector('.settings'),
  colorsPaletteMarker = document.querySelector('.colors__palette-marker'),
  exampleLine = document.getElementById('example-line'),
  slider = document.querySelector('.line-width-slider'),

  drawModeCoordinate = [],
  drawModeSettings = {
    color: '#000',
    lineWidth: 1,
  };

  //temporary
  window.drawModeCoordinate = drawModeCoordinate;
  window.drawModeSettings = drawModeSettings;
  //

  createGradient(colorsPaletteCanvas, colorsPaletteCTX);

  const selectColorForListener = event => {
    selectColor(event, colorsPaletteCanvas,
      colorsPaletteCTX,
      drawModeSettings,
      colorsPaletteMarker);
    updateExampleLine(exampleLine, drawModeSettings);
  };
  colorsPaletteCanvas.parentElement.addEventListener('mousedown', event => {
    selectColorForListener(event);
    colorsPaletteCanvas.addEventListener('mousemove', selectColorForListener);
  })
  colorsPaletteCanvas.parentElement.addEventListener('mouseup', event => {
    colorsPaletteCanvas.removeEventListener('mousemove', selectColorForListener);
  })
  //line width slider
  const lineWidthSlider = document.querySelector('.line-width-slider');
  const slideForListener = (event) => {
    slide(lineWidthSlider, event, drawModeSettings);
    updateExampleLine(exampleLine, drawModeSettings);
  };
  document.addEventListener('mousedown', event => {
    if (event.target.parentElement === lineWidthSlider) {
      slideForListener(event);
      document.addEventListener('mousemove', slideForListener);
    }
  })
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', slideForListener);
  })

  // drawmode on
  const addDrawModeCoordinate = event => {
    drawModeCoordinate.push([event.clientX - drawArea.offsetLeft,
      event.clientY - drawArea.offsetTop
    ]);
    requestAnimationFrame(redraw);
  };

  function redraw() {
    drawModeFunction(ctxDraw, drawModeCoordinate);
  }
  const drawModeOn = () => {
    drawModeCoordinate.push(drawModeSettings);
    drawArea.addEventListener('mousemove', addDrawModeCoordinate);
  };
  const drawModeOff = () => {
    drawArea.removeEventListener('mousemove', addDrawModeCoordinate);
  };

  window.requestAnimationFrame(redraw);

  const drawModeExitBtn = document.querySelector('.settings .exit-btn');

  drawModeExitBtn.onclick = () => {
    drawMode = false;
    drawModeSettingsElement.style.top = '-40px';
    drawArea.removeEventListener('mousedown', drawModeOn);
    drawArea.removeEventListener('mouseup', drawModeOff);
  }

  header.addEventListener('click', event => {
    if (event.target.dataset.btn === 'draw-mode') {
        slider.classList.remove('hide');
        
        drawMode = true;
        drawModeSettingsElement.style.top = '0px';
        drawArea.addEventListener('mousedown', drawModeOn);
        drawArea.addEventListener('mouseup', drawModeOff);
    }
  })
  //drawMode end
}