
document.addEventListener('DOMContentLoaded', compositionLoad, {once: true})

//create element and moving this by holding the element
//start moving
document.addEventListener('mousedown', event => {
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
  }
})
//moving by holding the handle-move button
document.addEventListener('mousedown', event => {
  if (event.target.dataset.func === 'move') {
    //bind function moveElement
    const tempElem = moveElementByBtn( event.target.parentNode, event);
    moveTempElement = curryMoveElementFunc(moveElementByBtn, tempElem);
    //moving
    document.addEventListener('mousemove', moveTempElement);
    document.addEventListener('mousemove', updateCoordinatesList);
    document.addEventListener('mousemove', drawLineOnCanvasBG);
  }
})
//end moving
document.addEventListener('mouseup', (event) => {
  updateOutputList(getOutputStructure(elements, [firstElement]));
  document.removeEventListener('mousemove', moveTempElement);
  document.removeEventListener('mousemove', updateCoordinatesList);
  document.removeEventListener('mousemove', drawLineOnCanvasBG);
})

//editing the text into element
//change prop value for element in elements collrection
document.addEventListener('click', edit);

//removing the element
document.addEventListener('click', compositionRemove);

//no comments
window.addEventListener('resize', compositionResize);

trash.addEventListener('click', openTrash);