'use strict';
const firstElement = document.querySelector('#firstElement');
const drawArea = document.querySelector('.draw-area');
const canvasBG = document.getElementById('canvas-bg');
const ctxBG = canvasBG.getContext('2d');
const outputList = document.querySelector('.text-output ol');
const trash = document.querySelector('.trash');
const trashHead = document.querySelector('.trash__head');
let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight;
let moveTempElement;

const elements = new Map();
let linesCoordinates = pullPairCoordinates();
let textList = [];
const trashCollection = new Map();
/*
Example
structure for element  {
  level: (Number) element.dataset.level,
  value: (String) element.textContent,
  parent: (Object) element from which the current element follows,
  children: (Array(Object)) elements that follow from the current element
  coordX: (Number) coordinates of center
  coordY: (Number) coordinates of center 
}
*/
elements.set(firstElement, {
                            level: '0',
                            value: 'first',
                            parent: null,
                            children: [],
                            coordX: null,
                            coordY: null,
                           })


//////////////////////////////////////////////////
/////////////////////Listeners////////////////////
//////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  //firstElement move to the center of screen
  const centerCoord = getCenterCoordDrawArea()
  changeCoordInElementsCollection(moveElement(firstElement, centerCoord));

  //sizing bacground canvas = drawArea 
  resizeCanvas();
}, {once: true})

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
  document.removeEventListener('mousemove', moveTempElement);
  document.removeEventListener('mousemove', updateCoordinatesList);
  document.removeEventListener('mousemove', drawLineOnCanvasBG);
})

//editing the text into element
//change prop value for element in elements collrection
document.addEventListener('click', event => {
  if (event.target.dataset.func === 'edit') {
    event.target.previousSibling.textContent = '';
    event.target.nextElementSibling.classList.remove('hide');
    event.target.nextElementSibling.focus();

    function forListenerKeydown(event) {
      if (event.keyCode === 13) {
        event.target.parentNode.firstChild.textContent = event.target.value;
        elements.get(event.target.parentNode).value = event.target.value;
        updateTextList();
        event.target.classList.add('hide');
        event.target.removeEventListener('keydown', forListenerKeydown);
      }
    }

    event.target.nextElementSibling.addEventListener('keydown', forListenerKeydown)
  }
})

//removing the element
document.addEventListener('click', event => {
  if (event.target.dataset.func === 'remove') {
    removeElement(event.target.parentNode);
    // updateCoordinatesList();
    // drawLineOnCanvasBG();
  }
})

//no comments
window.addEventListener('resize', () => {
  resizeCanvas();
  resizeWindow();
  updateCoordinatesList();
  drawLineOnCanvasBG();
});

//////////////////////////////////////////////////
/////////////////////Functions////////////////////
//////////////////////////////////////////////////

//I/O = - / object {clientX: Number, clientY: Number};
function getCenterCoordDrawArea() {
  return {clientX: +drawArea.offsetLeft + drawArea.clientWidth / 2,
          clientY: +drawArea.offsetTop + drawArea.clientHeight / 2}
}

//I/O = obj with current level, event / div with level+1 and structure
function createElement(obj) {
  const newElement = document.createElement('div');
  newElement.classList.add('element');
  newElement.textContent = 'New';
  newElement.dataset.level = +obj.dataset.level + 1;
  newElement.dataset.name = 'element';
  newElement.insertAdjacentHTML('beforeend', 
        '<div class="element__btn element__edit" data-func="edit">&#9998;</div>'
      + '<input class="input hide" type="text"></input>'
      + '<div class="element__btn element__remove" data-func="remove">&#10008;</div>'
      + '<div class="element__btn element__move" data-func="move">&#9995;</div>');
  return newElement;
}

//I/O = object, object / object (main element)
function appendElement(element, place) {
  place.append(element);
  return element
}

//I/O = object, event / object (main element)
function moveElement(element, event) {
  element.style.top = event.clientY - element.clientHeight / 2 + 'px';
  element.style.left = event.clientX - element.clientWidth / 2 + 'px';
  correctPosition(element);
  changeCoordInElementsCollection(element);
  return element;
}


//I/O = object / if on board last element return this, else return trus
function removeElement(element) {
  if (elements.size <= 1) return element;

  trashCollection.set(element, elements.get(element)) 
  //animation
  element.classList.add('element-smooth-move')
  element.style.left = trash.offsetLeft + trash.clientWidth / 2 + 'px';
  element.style.top = trash.offsetTop + trash.clientHeight / 2 + 'px';
  element.style.transform = 'rotate(360deg)';
  trashHead.classList.add('trash__head-animate');
  //animation code end

  //remove element from collections and property children
  if (elements.has(element)) {
    //remove child from parent element in elements collection
    const parent = elements.get(element).parent;
    if (elements.has(parent)) {
      elements.get(parent).children = elements.get(parent)
      .children.filter(child => child != element);
    }
    //change value parent of all children to 'deleted'
    elements.get(element).children.forEach(child => {
      elements.get(child).parent = 'deleted';
    })
  }
  elements.delete(element);
  updateCoordinatesList();
  drawLineOnCanvasBG();
  
  element.addEventListener('transitionend', () => {
    trashHead.classList.remove('trash__head-animate');
    element.remove();
  }, {once: true});

  return true;
}

//I/O = object, event / object (main element)
function moveElementByBtn (element, event) {
  element.style.top = event.clientY - element.clientHeight / 2 + 'px';
  element.style.left = event.clientX - element.clientWidth + 'px';
  correctPosition(element);
  changeCoordInElementsCollection(element);
  return element;
}

//I/O = element / true;
function correctPosition(element) {
  if (element.offsetTop < drawArea.offsetTop) element.style.top = drawArea.offsetTop + 'px';
  if (element.offsetTop + element.clientHeight >
      drawArea.offsetTop + drawArea.clientHeight) element.style.top = drawArea.offsetTop
                                                                    + drawArea.clientHeight
                                                                    - element.clientHeight
                                                                    + 'px';
  if (element.offsetLeft < drawArea.offsetLeft) element.style.left = drawArea.offsetLeft + 'px';
  if (element.offsetLeft + element.clientWidth >
      drawArea.offsetLeft + drawArea.clientWidth) element.style.left =  drawArea.offsetLeft
                                                                      + drawArea.clientWidth
                                                                      - element.clientWidth
                                                                      + 'px';
  return true;
}

//I/O = object / object (main element)
function changeCoordInElementsCollection(element) {
  elements.get(element).coordX = element.offsetLeft + element.clientWidth / 2;
  elements.get(element).coordY = element.offsetTop + element.clientHeight / 2;
  return element;
}


//I/O = element / curry function moveElement(event) binded with element
function curryMoveElementFunc (func, elem) {
  drawLineOnCanvasBG();
  return event => func(elem, event);
}

//I/O = object, object (main element)
function addElemToElementsCollection(elem) {
  elements.set(elem, {
    level: elem.dataset.level,
    value: 'new',
    parent: null,
    children: [],
    coordX: elem.offsetLeft + elem.clientWidth / 2,
    coordY: elem.offsetTop + elem.clientHeight / 2,
  })
  return elem
}

//I/O = object / object (main element)
function addParentToElemFromElementsCollection(elem, parent) {
  elements.get(elem).parent = parent;
  return elem
}

//I/O = object, object / object (child)
function addChildrenToParentElem(parent, child) {
  elements.get(parent).children.push(child);
  return child;
}

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

//draw coupling lines
function drawLineOnCanvasBG() {
  ctxBG.clearRect(0, 0, canvasBG.width, canvasBG.height);
  ctxBG.lineWidth = 3;
  linesCoordinates.forEach(element => {
    ctxBG.beginPath();
    //coordinates parent element
    ctxBG.moveTo(element[0][0] - canvasBG.offsetLeft, element[0][1] - canvasBG.offsetTop);
    //coordinates child element
    ctxBG.lineTo(element[1][0] - canvasBG.offsetLeft, element[1][1] - canvasBG.offsetTop);
    ctxBG.closePath();
    ctxBG.stroke();
  })
  return true;
}

//reposition elements
function resizeWindow() {
  const deltaH = document.documentElement.clientHeight / h;
  const deltaW = document.documentElement.clientWidth / w;
  Array.from(elements.keys()).forEach(elem => {
    elem.style.top = elem.offsetTop * deltaH + 'px';
    elem.style.left = elem.offsetLeft * deltaW + 'px';
    correctPosition(elem);
    changeCoordInElementsCollection(elem);
  })  
  w = document.documentElement.clientWidth;
  h = document.documentElement.clientHeight;
  return true;
}

//resize canvas
function resizeCanvas() {
  canvasBG.setAttribute('width', `${drawArea.clientWidth}px`);
  canvasBG.setAttribute('height', `${drawArea.clientHeight}px`);
  return true;
}

//change output text
function updateTextList() {
  textList = [...Array.from(elements.entries()).map(elem => [elem[0], +elem[1].level, elem[1].value])];
  return true;
}