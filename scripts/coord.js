export {pullPairCoordinates, getCenterCoordDrawArea}; 

//function create array [[[x0,y0], [x1,y1]], [[x0,y0], [x1,y1]] ... [[x0,y0], [x1,y1]]]
//for couple parent-child
function pullPairCoordinates(collection) {
  const arrElements = Array.from(collection.values())
  const pairParentCoordChildrenCoord = arrElements.map(elem => 
  [[elem.coordX, elem.coordY], 
  elem.children.map(child => [collection.get(child).coordX, collection.get(child).coordY])]);
  //transform[[parentCoord], [[childCoord], [childCoord], ... [childCoord]]] => 
  // => [[[parentCoord], [childCoord]], [[parentCoord], [childCoord]] ...]
  const pairParentCoordChildCoord  = pairParentCoordChildrenCoord.map(elem => {
  const parentCoord = elem[0];
  return elem[1].map(elem => [parentCoord, elem])
  })
  return pairParentCoordChildCoord.flat();
}



//I/O = - / object {clientX: Number, clientY: Number};
function getCenterCoordDrawArea(drawArea) {
  return {clientX: +drawArea.offsetLeft + drawArea.clientWidth / 2,
          clientY: +drawArea.offsetTop + drawArea.clientHeight / 2}
}