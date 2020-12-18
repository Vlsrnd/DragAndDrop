export const addToCollection = (element, collection, parent = false) => {
  if (parent) {
    const parentInCollection = collection.filter( obj => obj.element === parent )[0];
    parentInCollection.children.push(element);
  }
  collection.push({
    element: element,
    children: [],
  })
};