export const selectColor = (event, canvas, context, element, settings, marker) => {
  const x = event.clientX - canvas.parentElement.offsetLeft;
  const y = event.clientY - canvas.parentElement.offsetTop;
  marker.style.left = x  - marker.clientWidth + 'px';
  marker.style.top = y  - marker.clientHeight + 'px';
  const colorData = context.getImageData(x,y,1,1);
  const [r, g, b, a] = colorData.data;
  settings.color = `rgba(${r}, ${g}, ${b}, ${a})`
  element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
};
