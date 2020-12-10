export {getElementsCoordinate};

const getElementsCoordinate = (collection) => {
  if (collection.length < 2) return [];
  const coordinates = [];
  collection.forEach(obj => {
    const firstPoint = [obj.element.offsetLeft + obj.element.clientWidth / 2,
                        obj.element.offsetTop + obj.element.clientHeight / 2];
    obj.children.forEach(child => {
      if (child.dataset.deleted === 'false') {
        coordinates.push([firstPoint, [child.offsetLeft + child.clientWidth / 2,
                                       child.offsetTop + child.clientHeight / 2]]);
      }
    })
  })
  return coordinates;
};