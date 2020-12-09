export {removeElement};

const removeElement = (element, collection) => {
  if (collection.length <= 1) return;
  const children = collection.filter(obj => obj.element === element)[0].children;
  const trash = [];
  children.forEach(element => {
    if (element.dataset.deleted === 'false') {
      element.dataset.deleted = 'true';
      element.classList.add('hide')
      trash.push(element);
    }
  });
  element.dataset.deleted = 'true';
  element.classList.add('hide');
  trash.push(element);
  return {time: new Date(), deletedElements: trash};
};