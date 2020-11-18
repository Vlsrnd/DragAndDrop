//I/O = object, event / object (main element)
function moveElement(element, event) {
  element.style.top = event.clientY - element.clientHeight / 2 + 'px';
  element.style.left = event.clientX - element.clientWidth / 2 + 'px';
  correctPosition(element);
  changeCoordInElementsCollection(element);
  return element;
}

//I/O = object, event / object (main element)
function moveElementByBtn (element, event) {
  element.style.top = event.clientY - element.clientHeight / 2 + 'px';
  element.style.left = event.clientX - element.clientWidth + 'px';
  correctPosition(element);
  changeCoordInElementsCollection(element);
  return element;
}

//I/O = element / element;
function correctPosition(element) {
  const minY = drawArea.offsetTop;
  const maxY = drawArea.offsetTop + drawArea.clientHeight - element.clientHeight;
  element.style.top = Math.max(minY, Math.min(maxY, element.offsetTop)) + 'px';

  const minX = drawArea.offsetLeft;
  const maxX = drawArea.offsetLeft + drawArea.clientWidth - element.clientWidth;
  element.style.left = Math.max(minX, Math.min(maxX, element.offsetLeft)) + 'px';
  return element;
}

//I/O = element / curry function moveElement(event) binded with element
function curryMoveElementFunc (func, elem) {
  drawLineOnCanvasBG();
  return event => func(elem, event);
}
