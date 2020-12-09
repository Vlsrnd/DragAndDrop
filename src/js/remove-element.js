export {removeElement};

const removeElement = (element, collection) => {
  if (collection.length <= 1) return;
  const children = collection.filter(obj => obj.element === element)[0].children;
  
  const parentElementInCollection = collection.filter(obj => obj.children.includes(element))[0];
  parentElementInCollection.children = parentElementInCollection.children
                                        .filter(child => child !== element);
  // debugger;
  const newElementsCollection = collection.filter(obj => obj.element !== element &&
                                                         !children.includes(obj.element));
  children.forEach(element => {
    element.dataset.delete = 'true';
    element.classList.add('hide')
  });
  element.dataset.delete = 'true';
  element.classList.add('hide');
  const trash = [...document.querySelectorAll('.element[data-delete=true]')];
  return trash;
};