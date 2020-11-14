'use strict';
const firstElement = document.querySelector('#firstElement');
const drawArea = document.querySelector('.draw-area');
const canvasBg = document.getElementById('canvas-bg');
const ctxBG = canvasBg.getContext('2d');
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
  canvasBg.style.width = drawArea.clientWidth + 'px';
  canvasBg.style.height = drawArea.clientHeight + 'px';
}, {once: true})

//moving by holding the element
//start moving
document.addEventListener('mousedown', event => {
  if (event.target.dataset.name === 'element') {
    //bind function moveElement
    const tempElem = moveElement( appendElement( createElement(event.target, event), drawArea ), event );
    addParentToElemFromElementsCollection(addElemToElementsCollection(tempElem), event.target);
    addChildrenToParentElem(event.target, tempElem);
    moveTempElement = curryMoveElementFunc(moveElement, tempElem);
//moving
    document.addEventListener('mousemove', moveTempElement);
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
  }
})
//end moving
document.addEventListener('mouseup', (event) => {
  document.removeEventListener('mousemove', moveTempElement);
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
  }
})


//////////////////////////////////////////////////
/////////////////////Functions////////////////////
//////////////////////////////////////////////////

//I/O = - / object {clientX: Number, clientY: Number};
function getCenterCoordDrawArea() {
  return {clientX: +drawArea.offsetLeft + drawArea.clientWidth / 2,
          clientY: +drawArea.offsetTop + drawArea.clientHeight / 2}
}

//I/O = obj with current id, event / div with ++id and structure
function createElement(obj, event) {
  const newElement = document.createElement('div');
  newElement.classList.add('element');
  newElement.textContent = 'New';
  newElement.dataset.id = ++obj.dataset.id;
  newElement.dataset.name = 'element';
  newElement.insertAdjacentHTML('beforeend', '<div class="element__btn element__edit" data-func="edit">&#9998;</div>'
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
  return element;
}


//I/O = object / if on board last element return this, else return trus
function removeElement(element) {
  if (elements.size <= 1) return element;
  //remove element from collections and property children
  if (elements.has(element)) {
    //remove child from parent element in elements collection
    const parent = elements.get(element).parent;
    elements.get(parent).children = elements.get(parent).children.filter(child => child != element);
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
  return event => func(elem, event);
}

//I/O = object, object (main element)
function addElemToElementsCollection(elem) {
  elements.set(elem, {
    id: elem.dataset.id,
    value: 'new',
    parent: null,
    children: [],
    coordX: parseInt(elem.offsetLeft) + elem.clientWidth / 2,
    coordY: parseInt(elem.offsetTop) + elem.clientHeight / 2,
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
//перебираем children и добавляем пары координат текущие координаты и координаты чилдренов
function pullPairCoordinates() {
  const arr = Array.from(elements.values())
  const pairParentChildren = arr.map(elem => [[elem.coordX, elem.coordY], elem.children]);
  const temp = pairParentChildren.map(elem => [elem[0], elem[1].map(elem => [elements.get(elem).coordX, elements.get(elem).coordY])]);
  const someResult = temp.map(elem => {
    const parentCoord = elem[0];
    return elem[1].map(elem => [parentCoord, elem])
  })
  // const pair = pairParentCoordChildrenCoord.map()
  //  [[parent], [[child], [child], [child]] ]

  const result = someResult.flat();
  return result;
}

//temporary
//
// function drawLineOnCanvasBg(x0, y0, x1, y1]) {

// }


//add coordinates for firstElemn in elements collection
//add func getCenterCoordDrawArea
//add pullPairCoordinates