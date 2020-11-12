const firstElement = document.querySelector('#firstElement');
const container = document.querySelector('.container');
const inputText = document.querySelector('.input-text');


let moveTempElement;
//firstElement move to the center of screen
document.addEventListener('DOMContentLoaded', () => {
  moveElement(firstElement, {clientX: document.documentElement.clientWidth / 2,
                             clientY: document.documentElement.clientHeight / 2});
}, {once: true})


document.addEventListener('mousedown', (event) => {
  if (event.target.dataset.name !== 'element') return;

  //bind function moveElement
  const tempElem = moveElement(createElement(event.target), event);
  const bindMoveElement = elem => event => moveElement(elem, event)
  moveTempElement = bindMoveElement(tempElem);

  document.addEventListener('mousemove', moveTempElement);
})
//Заканчиваем перемещение
document.addEventListener('mouseup', (event) => {
  if (event.target.dataset.name !== 'element') return;
  document.removeEventListener('mousemove', moveTempElement);
})

function createElement(obj) {
  const newElement = document.createElement('div');
  newElement.classList.add('elements');
  newElement.textContent = 'New';
  newElement.dataset.id = ++obj.dataset.id;
  newElement.dataset.name = 'element';
  newElement.insertAdjacentHTML('beforeend', '<div class="elements__edit" data-func="edit">&#9998;</div>')
  container.append(newElement);
  console.log(newElement)
  return newElement;
}

function moveElement(elem, event) {
  elem.style.top = event.clientY - elem.clientHeight / 2 + 'px';
  elem.style.left = event.clientX - elem.clientWidth / 2 + 'px';
  return elem;
}

//edit listeners мутный кусок
document.addEventListener('click', event => {
  if (event.target.dataset.func === 'edit') {
    const parent = event.target.parentNode;
    parent.innerHTML = '<input type="text"></input>'
    const input = parent.querySelector('input');
    input.classList.add('input');
  }

  function changeText(event) {
    if (event.keyCode === 13){
      const parent = event.target.parentNode;
      text = event.target.value;
      // console.log(text);
      parent.innerHTML = text;
      parent.insertAdjacentHTML('beforeend', '<div class="elements__edit" data-func="edit">&#9998;</div>')

    }
  }

  parent.addEventListener('keydown', changeText);

})