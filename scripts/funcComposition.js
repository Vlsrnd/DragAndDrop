function compositionLoad() {
  //firstElement move to the center of screen
  const centerCoord = getCenterCoordDrawArea()
  changeCoordInElementsCollection(moveElement(firstElement, centerCoord));
  updateTextList();
  updateOutputList(getOutputStructure(elements, [firstElement]));
  //sizing bacground canvas = drawArea 
  resizeCanvas();
}

function compositionResize() {
  resizeCanvas();
  resizeWindow();
  updateCoordinatesList();
  drawLineOnCanvasBG();
}

function compositionRemove() {
  if (event.target.dataset.func === 'remove') {
    removeElement(event.target.parentNode);
    // updateCoordinatesList();
    // drawLineOnCanvasBG();
  }
}

