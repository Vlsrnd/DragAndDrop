export const resizeCanvas = (canvas, parentElement) => {
  canvas.setAttribute('width', parentElement.clientWidth);
  canvas.setAttribute('height', parentElement.clientHeight);
};

export const repositionElements = (collection, lastSize, parentElement) => {
  if (lastSize.width === null) debugger
  collection.forEach(obj => {
    const element = obj.element;
    element.style.left = element.offsetLeft * (parentElement.clientWidth / lastSize.width) + 'px';
    element.style.top =  element.offsetTop * (parentElement.clientHeight / lastSize.height) + 'px';
  })
  lastSize.width = parentElement.clientWidth;
  lastSize.height = parentElement.clientHeight;
};