export {removeElement};

const removeElement = (element, collection) => {
  if (collection.length <= 1) return;
  const children = collection.filter(obj => obj.element === element)[0].children;

  // debugger;
  children.forEach(element => {
    element.dataset.delete = 'true';
    element.classList.add('hide')
  });
  element.dataset.delete = 'true';
  element.classList.add('hide');
  const trash = [...document.querySelectorAll('.element[data-delete=true]')];
  return trash;
};