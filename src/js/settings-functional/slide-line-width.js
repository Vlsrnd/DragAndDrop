export const slideLineWidth = (slider, event, settings) => {
  event.preventDefault();
  const line = slider.querySelector('.line');
  const marker = slider.querySelector('.marker');
  let newPosition = event.clientX - slider.offsetLeft - marker.clientWidth / 2;
  newPosition = Math.max(0, Math.min(line.clientWidth - marker.clientWidth, newPosition))
  marker.style.left =  newPosition + 'px';
  const value = String(Math.round(newPosition / line.clientWidth * 10 + 1))
  switch (settings.settingsMode) {
    case 'DRAW':
      settings.drawMode.lineWidth = value;
      break;
    case 'LINE':
      settings.lineWidth = value;
      break;
    default:
      console.log(`Something went wrong in slide-line-width. Settings mode is ${settings.settingsMode}`)
      break;
  }
};