export {compositionLoad, compositionResize, compositionRemove, 
        compositionMoveStart, compositionMoveEnd};

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

function compositionRemove(event) {
  if (event.target.dataset.func === 'remove') {
    removeElement(event.target.parentNode);
    // updateCoordinatesList();
    // drawLineOnCanvasBG();
  }
}


function compositionMoveStart(event) {
  if (event.target.dataset.name === 'element') {
    // debugger;
    //bind function moveElement
    const tempElem = moveElement(
                      addElemToElementsCollection( 
                        appendElement( createElement(event.target), drawArea)
                      ), event );
    updateTextList();
    
    // console.log(tempElem);
    addParentToElemFromElementsCollection(tempElem, event.target);
    addChildrenToParentElem(event.target, tempElem);
    moveTempElement = curryMoveElementFunc(moveElement, tempElem);
    //moving
    document.addEventListener('mousemove', moveTempElement);
    document.addEventListener('mousemove', updateCoordinatesList);
    document.addEventListener('mousemove', drawLineOnCanvasBG);
  } else if (event.target.dataset.func === 'move') {
    //bind function moveElement
    const tempElem = moveElementByBtn( event.target.parentNode, event);
    moveTempElement = curryMoveElementFunc(moveElementByBtn, tempElem);
    //moving
    document.addEventListener('mousemove', moveTempElement);
    document.addEventListener('mousemove', updateCoordinatesList);
    document.addEventListener('mousemove', drawLineOnCanvasBG);
  }
}

function compositionMoveEnd(event) {
  updateOutputList(getOutputStructure(elements, [firstElement]));
  document.removeEventListener('mousemove', moveTempElement);
  document.removeEventListener('mousemove', updateCoordinatesList);
  document.removeEventListener('mousemove', drawLineOnCanvasBG);
}