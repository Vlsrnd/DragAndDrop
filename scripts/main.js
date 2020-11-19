//import {sayHi} from './sayHi.js'


import {pullPairCoordinates, updateCoordinatesList, getCenterCoordDrawArea} from './coord.js';
import {openTrash} from './openTrash.js';
import {moveElement, moveElementByBtn, correctPosition, curryMoveElementFunc, changeCoordInElementsCollection} from './move.js';
import {addElemToElementsCollection, addParentToElemFromElementsCollection, addChildrenToParentElem} from './elemCollections.js';
import {updateTextList, updateOutputList, getOutputStructure} from './outText.js';
import {resizeCanvas, resizeWindow} from './resize.js';
import {createElement, appendElement} from './create.js';
import {drawLineOnCanvasBG} from './canvas.js';

const firstElement = document.querySelector('#firstElement');
const drawArea = document.querySelector('.draw-area');
const canvasBG = document.getElementById('canvas-bg');
const ctxBG = canvasBG.getContext('2d');
const outputList = document.querySelector('.text-output');
const trash = document.querySelector('.trash');
const trashHead = document.querySelector('.trash__head');
let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight;
let moveTempElement;

const elements = new Map();
let linesCoordinates = pullPairCoordinates(elements);
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


document.addEventListener('DOMContentLoaded', compositionLoad, {once: true})
//create element and moving this of move element
//start moving
document.addEventListener('mousedown', compositionMoveStart);

//editing the text into element
//change prop value for element in elements collrection
document.addEventListener('click', compositionEdit);

//removing the element
document.addEventListener('click', compositionRemove);

//no comments
window.addEventListener('resize', compositionResize);

trash.addEventListener('click', openTrash);



/////////////////////////
//Composition functions//
/////////////////////////

function compositionEdit(event) {
  if (event.target.dataset.func === 'edit') {
    event.target.previousSibling.textContent = '';
    event.target.nextElementSibling.classList.remove('hide');
    event.target.nextElementSibling.focus();
    
    function forListenerKeydown(event) {
      if (event.keyCode === 13) {
        event.target.parentNode.firstChild.textContent = event.target.value;
        elements.get(event.target.parentNode).value = event.target.value;
        updateTextList(textList, elements);
        updateOutputList(getOutputStructure(elements, [firstElement]), outputList);
        event.target.classList.add('hide');
        event.target.removeEventListener('keydown', forListenerKeydown);
      }
    }
    
    event.target.nextElementSibling.addEventListener('keydown', forListenerKeydown)
  }
}

function compositionLoad() {
  //firstElement move to the center of screen
  const centerCoord = getCenterCoordDrawArea(drawArea);
  changeCoordInElementsCollection(moveElement(firstElement, elements, centerCoord, drawArea), elements);
  updateTextList(textList, elements);
  updateOutputList(getOutputStructure(elements, [firstElement]), outputList);
  //sizing bacground canvas = drawArea 
  resizeCanvas(canvasBG, drawArea);
}

function compositionResize() {
  resizeCanvas(canvasBG, drawArea);
  resizeWindow(elements, w, h);
  updateCoordinatesList();
  drawLineOnCanvasBG(ctxBG, canvasBG, linesCoordinates);
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
    const newElement = createElement(event.target);
    appendElement(newElement, drawArea);
    addElemToElementsCollection(newElement, elements);

    function moveAt (event) {
      newElement.style.top = event.clientY - newElement.clientHeight / 2 + 'px';
      newElement.style.left = event.clientX - newElement.clientWidth / 2 + 'px';
      correctPosition(newElement, drawArea);
      changeCoordInElementsCollection(newElement, elements);
    }

    moveAt(event);

    updateTextList(textList, elements);
    addParentToElemFromElementsCollection(newElement, event.target, elements);
    addChildrenToParentElem(event.target, newElement, elements);


    //moving
    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mousemove', updateCoordinatesList);
    document.addEventListener('mousemove', drawLineOnCanvasBG);

    document.onmouseup = () => {
      document.removeEventListener('mousemove', moveAt);
      document.removeEventListener('mousemove', updateCoordinatesList);
      document.removeEventListener('mousemove', drawLineOnCanvasBG);
      document.onmouseup = null;
    }
  } else if (event.target.dataset.func === 'move') {
    //bind function moveElement
    const tempElem = moveElementByBtn( event.target.parentNode, elements, event, drawArea);
    moveTempElement = curryMoveElementFunc(moveElementByBtn, tempElem);
    //moving
    document.addEventListener('mousemove', moveTempElement);
    document.addEventListener('mousemove', updateCoordinatesList);
    document.addEventListener('mousemove', drawLineOnCanvasBG);
  }
}

