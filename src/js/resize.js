export {resizeCanvas, repositionElements};

function resizeCanvas(canvas, parentElement) {
  canvas.setAttribute('width', parentElement.clientWidth);
  canvas.setAttribute('height', parentElement.clientHeight);
}


//collection === elementsCollection, parentElement === drawArea
function repositionElements(collection, previousSize, parentElement) {
  [...collection.keys()].forEach(element => {
    collection.get(element).clientX *= parentElement.clientWidth / previousSize.width;
    collection.get(element).clientY *= parentElement.clientHeight / previousSize.height;
    collection.get(element).move();
  })
}