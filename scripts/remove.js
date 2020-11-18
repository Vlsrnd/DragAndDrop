//I/O = object / if on board last element return this, else return trus
function removeElement(element) {
  if (elements.size <= 1) return element;

  trashCollection.set(element, elements.get(element)) 
  //animation
  element.classList.add('element-smooth-move')
  element.style.left = trash.offsetLeft + trash.clientWidth / 2 + 'px';
  element.style.top = trash.offsetTop  + 'px';
  element.style.transform = 'rotate(360deg)';
  trashHead.classList.add('trash__head-animate');
  //animation code end

  //remove element from collections and property children
  if (elements.has(element)) {
  //remove child from parent element in elements collection
  const parent = elements.get(element).parent;
  if (elements.has(parent)) {
  elements.get(parent).children = elements.get(parent)
  .children.filter(child => child != element);
  }
  //change value parent of all children to 'deleted'
  elements.get(element).children.forEach(child => {
  elements.get(child).parent = 'deleted';
  })
  }
  elements.delete(element);
  updateCoordinatesList();
  drawLineOnCanvasBG();
  
  element.addEventListener('transitionend', () => {
  trashHead.classList.remove('trash__head-animate');
  element.remove();
  }, {once: true});

  return true;
}
  