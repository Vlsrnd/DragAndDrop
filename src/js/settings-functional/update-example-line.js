export const updateExampleLine = (example, exampleLine, settings) => {
  switch (settings.settingsMode) {
    case 'DRAW':
    case 'LINE':
      let settingsSource = settings.settingsMode === 'DRAW' ? settings.drawMode : settings;
      exampleLine.style.borderColor = settingsSource.color;
      exampleLine.style.borderWidth = settingsSource.lineWidth + 'px';
      exampleLine.style.transform = `translateY(-${settingsSource.lineWidth / 2}px)`
      break;
    case 'BG':
      example.style.backgroundColor = settings.colorBG;
      break;
    default:
      console.log(`Something went wrong in updateExample. Settings mode is ${settings.settingsMode}`)
      break;
  }
}