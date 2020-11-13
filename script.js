'use strict';
const firstElement = document.querySelector('#firstElement');
const drawArea = document.querySelector('.draw-area');
const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;
let moveTempElement;
const elements = [
  element00: {
    id: 0,
    value: 'first',
    parent: null,
    children: null,
    coordX: null,
    coordY: null,
  }
]

//////////////////////////////////////////////////
/////////////////////Listeners////////////////////
//////////////////////////////////////////////////

//firstElement move to the center of screen
document.addEventListener('DOMContentLoaded', () => {
  moveElement(firstElement, {clientX: drawArea.getBoundingClientRect().left + drawArea.clientWidth / 2,
                             clientY: drawArea.getBoundingClientRect().top + drawArea.clientHeight / 2});
}, {once: true})

//moving by holding the element
//start moving
document.addEventListener('mousedown', event => {
  if (event.target.dataset.name === 'element') {
    //bind function moveElement
    const tempElem = moveElement( appendElement( createElement(event.target), drawArea ), event );
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
document.addEventListener('click', event => {
  if (event.target.dataset.func === 'edit') {
    event.target.previousSibling.textContent = '';
    event.target.nextElementSibling.classList.remove('hide');
    event.target.nextElementSibling.focus();

    function forListenerKeydown(event) {
      if (event.keyCode === 13) {
        event.target.parentNode.firstChild.textContent = event.target.value;
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
    //if there is one element on board, break
    //need to change this condition when I'll add setting with count of elements
    if (document.querySelectorAll('.element').length <= 1) return;
    event.target.parentNode.remove();
  }
})


//////////////////////////////////////////////////
/////////////////////Functions////////////////////
//////////////////////////////////////////////////

//I/O = obj with current id / div with ++id and structure
function createElement(obj) {
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

//I/O = element / element
function appendElement(element, place) {
  place.append(element);
  return element
}

//I/O = element / element
function moveElement(element, event) {
  element.style.top = event.clientY - element.clientHeight / 2 + 'px';
  element.style.left = event.clientX - element.clientWidth / 2 + 'px';
  return element;
}

//I/O = element / element
function moveElementByBtn (element, event) {
  element.style.top = event.clientY - element.clientHeight / 2 + 'px';
  element.style.left = event.clientX - element.clientWidth + 'px';
  if (parseInt(element.style.top) < 0) element.style.top = 0 + 'px';
  if (parseInt(element.style.left) < 0) element.style.left = 0 + 'px';
  return element;
}

//I/O = element / curry function moveElement(event) binded with element
function curryMoveElementFunc (func, elem) {
  return event => func(elem, event);
}

