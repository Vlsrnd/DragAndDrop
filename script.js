const firstElement = document.querySelector('#firstElement');
const container = document.querySelector('.container');

const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;

//firstElement position in the center of screen
document.addEventListener('DOMContentLoaded', () => {
  moveElement(firstElement, w / 2, h / 2);
}, {once: true})


document.addEventListener('mousedown', (event) => {
  // firstElement.textContent = (event.clientX + '   ' + event.clientY);
  if (event.target.dataset.name !== 'element') return;
  const tempElem = moveElement(createElement(event.target), event.clientX, event.clientY);
  // document.addEventListener('mousemove', (mouseMoveEvent) => {
  //   moveElement(tempElem, mouseMoveEvent.clientX, mouseMoveEvent.clientY);
  // }, {once: true})
})

function createElement(obj) {
  const newElement = document.createElement('div');
  newElement.classList.add('elements');
  newElement.textContent = 'New Element';
  container.append(newElement);
  return newElement;
}

function moveElement(elem, x, y) {
  elem.style.top = y - elem.clientHeight / 2 + 'px';
  elem.style.left = x - elem.clientWidth / 2 + 'px';
  return elem;
}