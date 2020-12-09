export {createElement};

const createElement = (structure) => {
  const newElement = document.createElement('div');
  newElement.classList.add('element');
  newElement.dataset.func = 'element';
  newElement.dataset.deleted = 'false';
  newElement.innerHTML = structure;
  return newElement; 
};
