'use strict';
const firstElement = document.querySelector('#firstElement');
const drawArea = document.querySelector('.draw-area');
const canvasBG = document.getElementById('canvas-bg');
const ctxBG = canvasBG.getContext('2d');
const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;
let moveTempElement;

const elements = new Map();
let linesCoordinates = pullPairCoordinates();
/*
Example
structure for element  {
  id: (Number) element.dataset.id,
  value: (String) element.textContent,
  parent: (Object) element from which the current element follows,
  children: (Array(Object)) elements that follow from the current element
  coordX: (Number) coordinates of center
  coordY: (Number) coordinates of center 
}
*/
elements.set(firstElement, {
                            id: 0,
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
  canvasBG.setAttribute('width', `${drawArea.clientWidth}px`);
  canvasBG.setAttribute('height', `${drawArea.clientHeight}px`);
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
    drawLineOnCanvasBG();
  }
})

// //////////////////////////////////////////////////
// ///////////////////////Canvas/////////////////////
// //////////////////////////////////////////////////

// const requestCanvasLine = requestAnimationFrame(drawLineOnCanvasBG)


//////////////////////////////////////////////////
/////////////////////Functions////////////////////
//////////////////////////////////////////////////

//I/O = - / object {clientX: Number, clientY: Number};
function getCenterCoordDrawArea() {
  return {clientX: +drawArea.offsetLeft + drawArea.clientWidth / 2,
          clientY: +drawArea.offsetTop + drawArea.clientHeight / 2}
}

//I/O = obj with current id, event / div with ++id and structure
function createElement(obj) {
  const newElement = document.createElement('div');
  newElement.classList.add('element');
  newElement.textContent = 'New';
  newElement.dataset.id = ++obj.dataset.id;
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
  changeCoordInElementsCollection(element);
  return element;
}


//I/O = object / if on board last element return this, else return trus
function removeElement(element) {
  if (elements.size <= 1) return element;
  //remove element from collections and property children
  if (elements.has(element)) {
    //remove child from parent element in elements collection
    const parent = elements.get(element).parent;
    elements.get(parent).children = elements.get(parent)
                                            .children.filter(child => child != element);
    //change value parent of all children to 'deleted'
    elements.get(element).children.forEach(child => {
      elements.get(child).parent = 'deleted';
    })
    //remove element
    elements.delete(element);
  }
  element.remove();
  return true;
}

//I/O = object, event / object (main element)
function moveElementByBtn (element, event) {
  element.style.top = event.clientY - element.clientHeight / 2 + 'px';
  element.style.left = event.clientX - element.clientWidth + 'px';
  if (parseInt(element.style.top) < 0) element.style.top = 0 + 'px';
  if (parseInt(element.style.left) < 0) element.style.left = 0 + 'px';
  changeCoordInElementsCollection(element);
  return element;
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
    id: elem.dataset.id,
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
  
  const result = pairParentCoordChildCoord.flat();
  return result;
}
//update coodrdinates list
function updateCoordinatesList() {
  linesCoordinates = pullPairCoordinates();
  return true;
}



//draw coupling lines
function drawLineOnCanvasBG() {
  ctxBG.clearRect(0, 0, canvasBG.width, canvasBG.height);
  linesCoordinates.forEach(element => {
    ctxBG.beginPath();
    //coordinates parent element
    ctxBG.moveTo(element[0][0] - canvasBG.offsetLeft, element[0][1] - canvasBG.offsetTop);
    //coordinates child element
    ctxBG.lineTo(element[1][0] - canvasBG.offsetLeft, element[1][1] - canvasBG.offsetTop);
    ctxBG.closePath();
    ctxBG.stroke();
  })
}

