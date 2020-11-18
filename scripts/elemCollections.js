//I/O = object, object (main element)
function addElemToElementsCollection(elem) {
  elements.set(elem, {
  level: elem.dataset.level,
  value: 'new',
  parent: null,
  children: [],
  coordX: elem.offsetLeft + elem.clientWidth / 2,
  coordY: elem.offsetTop + elem.clientHeight / 2,
  })
  return elem
}

//I/O = object / object (main element)
function addParentToElemFromElementsCollection(elem, parent) {
  elements.get(elem).parent = parent;
  return elem
}

//I/O = object, object / object (child)
function addChildrenToParentElem(parent, child) {
  elements.get(parent).children.push(child);
  return child;
}