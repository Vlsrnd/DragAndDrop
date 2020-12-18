function resizeCanvas(canvas, parentElement) {
  canvas.setAttribute('width', parentElement.clientWidth);
  canvas.setAttribute('height', parentElement.clientHeight);
}

function repositionElements(collection, lastSize, parentElement) {
  collection.forEach(obj => {
    const element = obj.element;
    element.style.left = element.offsetLeft * (parentElement.clientWidth / lastSize.width) + 'px';
    element.style.top =  element.offsetTop * (parentElement.clientHeight / lastSize.height) + 'px';
  })
  lastSize.width = parentElement.clientWidth;
  lastSize.height = parentElement.clientHeight;
}

export {resizeCanvas, repositionElements};