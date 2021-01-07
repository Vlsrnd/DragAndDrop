export const showSettings = (settings, settingsElement, mode) => {
  const switcher = settingsElement.querySelector('.settings-switch__mode');
  const lineWidthSlider = settingsElement.querySelector('.line-width-slider');
  settings.settingsMode = mode;
  switch (mode) {
    case 'DRAW':
      switcher.classList.add('hide');
      lineWidthSlider.classList.remove('hide');
      break;
    case 'BG':
      switcher.classList.remove('hide');
      lineWidthSlider.classList.add('hide');
      break;
    case 'LINE':
      switcher.classList.remove('hide');
      lineWidthSlider.classList.remove('hide');
      break;
    default:
      console.error(`Wrong property 'mode', you use '${mode} param`);
  }
  settingsElement.style.top = 0;
};

