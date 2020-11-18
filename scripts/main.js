//import {sayHi} from './sayHi.js'


import {pullPairCoordinates, updateCoordinatesList,
    changeCoordInElementsCollection, getCenterCoordDrawArea} from './coord.js';
import {compositionLoad, compositionResize, compositionRemove, 
    compositionMoveStart, compositionMoveEnd} from './funcComposition.js';


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