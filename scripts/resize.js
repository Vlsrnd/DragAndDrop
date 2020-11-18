//resize canvas
function resizeCanvas() {
  canvasBG.setAttribute('width', `${drawArea.clientWidth}px`);
  canvasBG.setAttribute('height', `${drawArea.clientHeight}px`);
  return true;
}


//reposition elements
function resizeWindow() {
  const deltaH = document.documentElement.clientHeight / h;
  const deltaW = document.documentElement.clientWidth / w;
  Array.from(elements.keys()).forEach(elem => {
    elem.style.top = elem.offsetTop * deltaH + 'px';
    elem.style.left = elem.offsetLeft * deltaW + 'px';
    correctPosition(elem);
    changeCoordInElementsCollection(elem);
  })  
  w = document.documentElement.clientWidth;
  h = document.documentElement.clientHeight;
  return true;
}

