//function create array [[[x0,y0], [x1,y1]], [[x0,y0], [x1,y1]] ... [[x0,y0], [x1,y1]]]
//for couple parent-child
function pullPairCoordinates() {
  const arrElements = Array.from(elements.values())
  const pairParentCoordChildrenCoord = arrElements.map(elem => 
  [[elem.coordX, elem.coordY], 
  elem.children.map(child => [elements.get(child).coordX, elements.get(child).coordY])]);
  //transform[[parentCoord], [[childCoord], [childCoord], ... [childCoord]]] => 
  // => [[[parentCoord], [childCoord]], [[parentCoord], [childCoord]] ...]
  const pairParentCoordChildCoord  = pairParentCoordChildrenCoord.map(elem => {
  const parentCoord = elem[0];
  return elem[1].map(elem => [parentCoord, elem])
  })
  return pairParentCoordChildCoord.flat();
}
//update coodrdinates list
function updateCoordinatesList() {
  linesCoordinates = pullPairCoordinates();
  return true;
}

//I/O = object / object (main element)
function changeCoordInElementsCollection(element) {
  elements.get(element).coordX = element.offsetLeft + element.clientWidth / 2;
  elements.get(element).coordY = element.offsetTop + element.clientHeight / 2;
  return element;
}

//I/O = - / object {clientX: Number, clientY: Number};
function getCenterCoordDrawArea() {
  return {clientX: +drawArea.offsetLeft + drawArea.clientWidth / 2,
          clientY: +drawArea.offsetTop + drawArea.clientHeight / 2}
}