export {createElement, appendElement}

//I/O = obj with current level, event / div with level+1 and structure
function createElement(obj) {
  const newElement = document.createElement('div');
  newElement.classList.add('element');
  newElement.textContent = 'New';
  newElement.dataset.level = +obj.dataset.level + 1;
  newElement.dataset.func = 'element';
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
