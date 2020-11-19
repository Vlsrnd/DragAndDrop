export {drawLineOnCanvasBG, curryMoveElementFunc};

//draw coupling lines
//I/O = context of canvas, canvas, array with [[x0,y0], [x1,y1]] / true
export function drawLineOnCanvasBG(context, canvas, coord) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 3;
  coord.forEach(element => {
  context.beginPath();
  //coordinates parent element
  context.moveTo(element[0][0] - canvas.offsetLeft, element[0][1] - canvas.offsetTop);
  //coordinates child element
  context.lineTo(element[1][0] - canvas.offsetLeft, element[1][1] - canvas.offsetTop);
  context.closePath();
  context.stroke();
  })
  return true;
}

//I/O = element / curry function moveElement(event) binded with element
function curryMoveElementFunc (func, elem, ) {
  drawLineOnCanvasBG();
  return event => func(elem, event);
}