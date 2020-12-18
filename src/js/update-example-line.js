const updateExampleLine = (example, settings) => {
  example.style.borderColor = settings.color;
  example.style.borderWidth = settings.lineWidth + 'px';
  example.style.transform = `translateY(-${settings.lineWidth / 2}px)`
}

export {updateExampleLine};