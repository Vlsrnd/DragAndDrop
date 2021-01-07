const DRAW_MODE = 'DRAW_MODE';
const BG_MODE = 'BG_MODE';
const LINE_MODE = 'LINE_MODE';

export const showSettings = (settingsElement, mode) => {
  const switcher = settingsElement.querySelector('.settings-switch__mode');
  const lineWidthSlider = settingsElement.querySelector('.line-width-slider');
  switch (mode) {
    case DRAW_MODE:
      switcher.classList.add('hide');
      lineWidthSlider.classList.remove('hide');
      break;
    case BG_MODE:
      switcher.classList.remove('hide');
      lineWidthSlider.classList.add('hide');
      break;
    case LINE_MODE:
      switcher.classList.remove('hide');
      lineWidthSlider.classList.remove('hide');
      break;
    default:
      console.error(`Wrong property 'mode', you use '${mode} param`);
  }
  settingsElement.style.top = 0;
};

