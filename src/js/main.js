'use strict';
export {drawArea, drawAreaWidth, drawAreaHeight, canvasBG, elementsCollection, trashCollection};
import {resizeCanvas, repositionElements} from './resize.js';
import '../css/style.css';
import '../index.html';
// import '../scss/main.scss';

const drawArea = document.querySelector('.draw-area'),
      drawAreaWidth = drawArea.clientWidth,
      drawAreaHeight = drawArea.clientHeight,
      canvasBG = document.getElementById('canvas-bg'),
      // startScreen = document.querySelector('.start'),
      // startButton = document.querySelector('.start__btn'),
      elementsCollection = new Map(),
      trashCollection = new Map();


window.addEventListener('load', () => {
  resizeCanvas(canvasBG, drawArea);
  const elem = new Element(null, 0, 0, drawArea, elementsCollection).create();
  elem.move({clientX: drawArea.clientWidth / 2, 
             clientY: elem.element.clientHeight / 2});
})

const resizeCanvasForListener = () => resizeCanvas(canvasBG, drawArea);

window.addEventListener('resize', () => {
  resizeCanvasForListener();
})


document.addEventListener('mousedown', event => {
  if (event.target.dataset.func === 'create'){
    const element = new Element(event.target.parentElement, event.clientX, event.clientY, drawArea, elementsCollection).create();
    const bindedElementMove = element.move.bind(element);
    document.addEventListener('mousemove', bindedElementMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', bindedElementMove);
    })
  } else if (event.target.dataset.func === 'element') {
    const targetElement = elementsCollection.get(event.target.parentElement);
    const bindedElementMove = targetElement.move.bind(targetElement);
    document.addEventListener('mousemove', bindedElementMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', bindedElementMove);
    })
  }
})


document.addEventListener('click', event => {
  if (event.target.dataset.func === 'edit'){
    elementsCollection.get(event.target.parentElement).edit();
  } else if (event.target.dataset.func === 'remove'){
    elementsCollection.get(event.target.parentElement).remove();
  }
})

class Element {
  constructor(parent, coordX, coordY, destination, collection){
    this.element = null;
    this.value = 'new';
    this.parent = parent;
    this.children = [];
    this.clientX = coordX;
    this.clientY = coordY;
    this.destination = destination;
    this.collection = collection;
    this.moveLimits = {
      top: 0,
      bottom: this.destination.clientHeight,
      left: 0,
      right: this.destination.clientWidth,
    };
    this.htmlStructure = `<div class="element__text" data-func="element">${this.value}</div>`
                        +'<input class="element__input hide" type="text"></input>'
                        +'<div class="element__btn element__btn-remove" data-func="remove" title="remove">&#10008;</div>'
                        +'<div class="element__btn element__btn-create" data-func="create" title="create">+</div>'
                        +'<div class="element__btn element__btn-edit" data-func="edit" title="edit">&#9998;</div>'
                        +'<div class="element__btn element__btn-info" data-func="info" title="info">i</div>';
  }
  create() {
    const newElement = document.createElement('div');
    newElement.classList.add('element');
    newElement.dataset.func = 'element';
    newElement.insertAdjacentHTML('beforeend', this.htmlStructure);
    this.element = newElement;
    //add to collection
    this.collection.set(this.element, this);
    //append to
    this.destination.append(this.element);
    this.addChildrenPropForParent(this.collection, this.parent)
    this.move(this);
    return this; 
  }

  move({clientX, clientY}) {
    const x = clientX - this.destination.offsetLeft - this.element.clientWidth / 2;
    const y = clientY - this.destination.offsetTop - this.element.clientHeight / 2;
    this.element.style.left = `${Math.max(this.moveLimits.left, Math.min(this.moveLimits.right - this.element.clientWidth, x))}px`;
    this.element.style.top = `${Math.max(this.moveLimits.top, Math.min(this.moveLimits.bottom - this.element.clientHeight, y))}px`;
    this.clientX = this.element.offsetLeft + this.element.clientWidth / 2;
    this.clientY = this.element.offsetTop + this.element.clientHeight / 2;
  }

  addChildrenPropForParent(collection, parent){
    if (this.parent) collection.get(parent).children.push(this.element);
  }
  edit(){
    const input = this.element.querySelector('.element__input');
    const text = this.element.querySelector('.element__text');
    const btns = [...this.element.querySelectorAll('.element__btn')];
    text.classList.add('hide');
    input.classList.remove('hide');
    btns.forEach(elem => elem.classList.add('hide'));
    input.focus();
    input.addEventListener('change', () => {
      text.textContent = input.value;
      input.value = '';
      text.classList.remove('hide');
      input.classList.add('hide');
      setTimeout(() => btns.forEach(elem => elem.classList.remove('hide')), 1000);
    }, {once: true})
  }

  remove(){
    if (this.collection.size <= 1) return;
    this.collection.get(this.parent).children = this.collection.get(this.parent).children
                                                     .filter(child => child !== this.element);
    this.children.forEach(child => this.collection.get(child).parent = 'deleted');
    this.collection.delete(this.element);
    this.element.remove();
  }
}


