//import {sayHi} from './sayHi.js'


import {pullPairCoordinates, updateCoordinatesList, getCenterCoordDrawArea} from './coord.js';
import {edit} from './edit.js';
import {openTrash} from './openTrash.js';
import {moveElement, moveElementByBtn, curryMoveElementFunc, changeCoordInElementsCollection} from './move.js';
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
//end moving
document.addEventListener('mouseup', compositionMoveEnd);

//editing the text into element
//change prop value for element in elements collrection
document.addEventListener('click', edit);

//removing the element
document.addEventListener('click', compositionRemove);

//no comments
window.addEventListener('resize', compositionResize);

trash.addEventListener('click', openTrash);



/////////////////////////
//Composition functions//
/////////////////////////

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
    const tempElem = moveElement(
                      addElemToElementsCollection( 
                        appendElement( createElement(event.target), drawArea), elements
                      ), elements, event, drawArea );
    updateTextList(textList, elements);
    
    // console.log(tempElem);
    addParentToElemFromElementsCollection(tempElem, event.target, elements);
    addChildrenToParentElem(event.target, tempElem, elements);
    moveTempElement = curryMoveElementFunc(moveElement, tempElem);
    //moving
    document.addEventListener('mousemove', moveTempElement);
    document.addEventListener('mousemove', updateCoordinatesList);
    document.addEventListener('mousemove', drawLineOnCanvasBG);
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

function compositionMoveEnd(event) {
  updateOutputList(getOutputStructure(elements, [firstElement]));
  document.removeEventListener('mousemove', moveTempElement);
  document.removeEventListener('mousemove', updateCoordinatesList);
  document.removeEventListener('mousemove', drawLineOnCanvasBG);
}