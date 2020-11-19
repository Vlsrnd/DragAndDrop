export {moveElement, correctPosition, changeCoordInElementsCollection, curryMoveElementFunc};

//I/O = object, event / object (main element)
function moveElement(element, collection, event, drawArea) {
  element.style.top = event.clientY - element.clientHeight / 2 + 'px';
  element.style.left = event.clientX - element.clientWidth / 2 + 'px';
  correctPosition(element, drawArea);
  changeCoordInElementsCollection(element, collection);
  return element;
}

//I/O = element / element;
function correctPosition(element, drawArea) {
  const minY = drawArea.offsetTop;
  const maxY = drawArea.offsetTop + drawArea.clientHeight - element.clientHeight;
  element.style.top = Math.max(minY, Math.min(maxY, element.offsetTop)) + 'px';

  const minX = drawArea.offsetLeft;
  const maxX = drawArea.offsetLeft + drawArea.clientWidth - element.clientWidth;
  element.style.left = Math.max(minX, Math.min(maxX, element.offsetLeft)) + 'px';
  return element;
}

//I/O = object / object (main element)
function changeCoordInElementsCollection(element, collection) {
  collection.get(element).coordX = element.offsetLeft + element.clientWidth / 2;
  collection.get(element).coordY = element.offsetTop + element.clientHeight / 2;
  return element;
}

//I/O = element / curry function moveElement(event) binded with element
function curryMoveElementFunc (func, elem) {
  return event => func(elem, event);
}