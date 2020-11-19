export {resizeCanvas, resizeWindow};

//resize canvas
function resizeCanvas(canvas, drawArea) {
  canvas.setAttribute('width', `${drawArea.clientWidth}px`);
  canvas.setAttribute('height', `${drawArea.clientHeight}px`);
  return true;
}


//reposition elements
//collection of elements, width window, height window 
function resizeWindow(collection, w, h, ...func) {
  const deltaH = document.documentElement.clientHeight / h;
  const deltaW = document.documentElement.clientWidth / w;
  Array.from(collection.keys()).forEach(elem => {
    elem.style.top = elem.offsetTop * deltaH + 'px';
    elem.style.left = elem.offsetLeft * deltaW + 'px';
    //correctPosition(elem);
    func[0](elem);
    //changeCoordInElementsCollection(elem);
    func[1](elem);
  })  
  w = document.documentElement.clientWidth;
  h = document.documentElement.clientHeight;
  return true;
}

