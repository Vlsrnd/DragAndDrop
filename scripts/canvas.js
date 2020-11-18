//draw coupling lines
function drawLineOnCanvasBG() {
  ctxBG.clearRect(0, 0, canvasBG.width, canvasBG.height);
  ctxBG.lineWidth = 3;
  linesCoordinates.forEach(element => {
  ctxBG.beginPath();
  //coordinates parent element
  ctxBG.moveTo(element[0][0] - canvasBG.offsetLeft, element[0][1] - canvasBG.offsetTop);
  //coordinates child element
  ctxBG.lineTo(element[1][0] - canvasBG.offsetLeft, element[1][1] - canvasBG.offsetTop);
  ctxBG.closePath();
  ctxBG.stroke();
  })
  return true;
}

