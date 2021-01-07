export const updateExampleLine = (example, exampleLine, settings) => {
  switch (settings.settingsMode) {
    case 'DRAW':
    case 'LINE':
      exampleLine.style.borderColor = settings.drawMode.color;
      exampleLine.style.borderWidth = settings.drawMode.lineWidth + 'px';
      exampleLine.style.transform = `translateY(-${settings.drawMode.lineWidth / 2}px)`
      break;
    case 'BG':
      example.style.backgroundColor = settings.colorBG;
      break;
    default:
      console.log(`Something went wrong in updateExample. Settings mode is ${settings.settingsMode}`)
      break;
  }
}