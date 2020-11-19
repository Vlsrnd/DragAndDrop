//I/O = object / if on board last element return this, else return trus
export function removeElement(element, elementsCollection, trashCollection, trash,
                              trashHead) {
  if (elementsCollection.size <= 1) return element;

  trashCollection.set(element, elementsCollection.get(element)) 
  console.log(trashCollection);
  //animation
  element.classList.add('element-smooth-move')
  element.style.left = trash.offsetLeft + trash.clientWidth / 2 + 'px';
  element.style.top = trash.offsetTop  + 'px';
  element.style.transform = 'rotate(360deg)';
  trashHead.classList.add('trash__head-animate');
  //animation code end

  //remove element from collections and property children
  if (elementsCollection.has(element)) {
  //remove child from parent element in elements collection
  const parent = elementsCollection.get(element).parent;
  if (elementsCollection.has(parent)) {
    elementsCollection.get(parent).children = elementsCollection.get(parent)
  .children.filter(child => child != element);
  }
  //change value parent of all children to 'deleted'
  elementsCollection.get(element).children.forEach(child => {
    elementsCollection.get(child).parent = 'deleted';
  })
  }
  elementsCollection.delete(element);
  
  element.addEventListener('transitionend', () => {
    trashHead.classList.remove('trash__head-animate');
    element.remove();
  }, {once: true});

  return true;
}
  