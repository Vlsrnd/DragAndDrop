const firstElement = document.querySelector('#firstElement');
const container = document.querySelector('.container');
const inputText = document.querySelector('.input-text');


let moveTempElement, moveBtnElement;
//firstElement move to the center of screen
document.addEventListener('DOMContentLoaded', () => {
  moveElement(firstElement, {clientX: document.documentElement.clientWidth / 2,
                             clientY: document.documentElement.clientHeight / 2});
}, {once: true})


document.addEventListener('mousedown', (event) => {
  if (event.target.dataset.name === 'element') {
    //bind function moveElement
    const tempElem = moveElement(createElement(event.target), event);
    const bindMoveElement = elem => event => moveElement(elem, event);
    moveTempElement = bindMoveElement(tempElem);

    document.addEventListener('mousemove', moveTempElement);
  } else if (event.target.dataset.func === 'move') {
    //перемещение
    //так не получилось
    // const bindMoveBtnElement = elem => event => moveElement(elem, event);
    // moveBtnElement = bindMoveBtnElement(event.parentNode);

    // document.addEventListener('mousemove', moveBtnElement);
    // сделать перемещение за кнопку
    console.log(event.target);
  }
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
  newElement.insertAdjacentHTML('beforeend', '<div class="elements__btn elements__edit" data-func="edit">&#9998;</div>'
                                + '<input class="input hide" type="text"></input>'
                                + '<div class="elements__btn elements__remove" data-func="remove">&#10008;</div>'
                                + '<div class="elements__btn elements__move" data-func="move">&#9995;</div>');
  container.append(newElement);
  console.log(newElement)
  return newElement;
}

function moveElement(elem, event) {
  elem.style.top = event.clientY - elem.clientHeight / 2 + 'px';
  elem.style.left = event.clientX - elem.clientWidth / 2 + 'px';
  return elem;
}

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
  } else if (event.target.dataset.func === 'remove') {
    if (document.querySelectorAll('.elements').length <= 1) return;
    event.target.parentNode.remove();
  }
})