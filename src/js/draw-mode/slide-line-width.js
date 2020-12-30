export const slide = (slider, event, setting = {}) => {
  event.preventDefault();
  const line = slider.querySelector('.line');
  const marker = slider.querySelector('.marker');
  let newPosition = event.clientX - slider.offsetLeft - marker.clientWidth / 2;
  newPosition = Math.max(0, Math.min(line.clientWidth - marker.clientWidth, newPosition))
  marker.style.left =  newPosition + 'px';
  const value = String(Math.round(newPosition / line.clientWidth * 10 + 1))
  setting.lineWidth = value;
};