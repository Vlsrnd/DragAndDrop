export {drawLinesOnCanvas};

const drawLinesOnCanvas = (canvas, context, coordinates) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 3;
  coordinates.forEach(element => {
    context.beginPath();
    //coordinates parent element
    context.moveTo(element[0][0] - canvas.offsetLeft, element[0][1] - canvas.offsetTop);
    //coordinates child element
    context.lineTo(element[1][0] - canvas.offsetLeft, element[1][1] - canvas.offsetTop);
    context.closePath();
    context.stroke();
  })
  return true;
};