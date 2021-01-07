import { mainSettings } from '../store/main-settings';
import { createGradient } from './create-gradient';
import { selectColor } from './select-color';
import { updateExampleLine } from './update-example-line';
import { slideLineWidth } from './slide-line-width';
import { showSettings } from './show-settings';
import { hideSettings } from './hide-settings';
import { drawModeOff, drawModeOn } from '../draw-mode/draw-mode-init';

export const settingsInit = () => {
  const colorsPaletteCanvas = document.getElementById('canvas-palette'),
    colorsPaletteCTX = colorsPaletteCanvas.getContext('2d'),
    drawArea = document.querySelector('.draw-area'),
    header = document.querySelector('.header'),
    settingsElement = document.querySelector('.settings'),
    colorsPaletteMarker = document.querySelector('.colors__palette-marker'),
    example = document.querySelector('.example'),
    exampleLine = example.querySelector('.example__line');

  createGradient(colorsPaletteCanvas, colorsPaletteCTX);

  const selectColorForListener = event => {
    selectColor(
      event,
      colorsPaletteCanvas,
      colorsPaletteCTX,
      mainSettings,
      colorsPaletteMarker);
    updateExampleLine(example, exampleLine, mainSettings);
  };

  colorsPaletteCanvas.parentElement.addEventListener('mousedown', event => {
    selectColorForListener(event);
    colorsPaletteCanvas.addEventListener('mousemove', selectColorForListener);
  });
  colorsPaletteCanvas.parentElement.addEventListener('mouseup', event => {
    colorsPaletteCanvas.removeEventListener('mousemove', selectColorForListener);
  });
  
  const lineWidthSlider = document.querySelector('.line-width-slider');
  const slideForListener = (event) => {
    slideLineWidth(lineWidthSlider, event, mainSettings);
    updateExampleLine(example, exampleLine, mainSettings);
  };
  document.addEventListener('mousedown', event => {
    if (event.target.parentElement === lineWidthSlider) {
      slideForListener(event);
      document.addEventListener('mousemove', slideForListener);
    }
  });
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', slideForListener);
  });

  //hide settings bar
  const settingsHideBtn = document.querySelector('.settings .exit-btn');
  settingsHideBtn.onclick = () => {
    mainSettings.isDrawMode = false;
    hideSettings(settingsElement);
    drawArea.removeEventListener('mousedown', drawModeOn);
    drawArea.removeEventListener('mouseup', drawModeOff);
  };

  header.addEventListener('click', event => {
    switch (event.target.dataset.btn) {
      case 'draw-mode':
        mainSettings.isDrawMode = true;
        showSettings(mainSettings, settingsElement, 'DRAW');
        drawArea.addEventListener('mousedown', drawModeOn);
        drawArea.addEventListener('mouseup', drawModeOff);
        break;
      case 'settings':
      case 'BG-settings':
        showSettings(mainSettings, settingsElement, 'BG');
        break;
      case 'LINE-settings':
        showSettings(mainSettings, settingsElement, 'LINE');
        break;
      default:
        break;
    }
  })
};