export const selectColor = (event, canvas, context, settings, marker) => {
  const x = event.clientX - canvas.parentElement.offsetLeft;
  const y = event.clientY - canvas.parentElement.offsetTop;
  marker.style.left = x  - marker.clientWidth + 'px';
  marker.style.top = y  - marker.clientHeight + 'px';
  const colorData = context.getImageData(x,y,1,1);
  const [r, g, b, a] = colorData.data;
  const color = `rgba(${r}, ${g}, ${b}, ${a})`;
  switch (settings.settingsMode) {
    case 'DRAW':
      settings.drawMode.lineColor = color;
      break;
    case 'BG':
      settings.colorBG = color;
      break;
    case 'LINE':
      settings.lineColor = color;
      break;
    default:
      console.log(`Something went wrong in selectColor. Settings mode is ${settings.settingsMode}`)
      break;
  }
};
