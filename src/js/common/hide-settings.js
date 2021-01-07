export const hideSettings = (settingsElement) => {
  settingsElement.style.top = `-${settingsElement.clientHeight}px`;
  return true;
};