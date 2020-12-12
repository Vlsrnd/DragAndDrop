export {drawModeFunction};

const drawModeFunction = (canvas, context, coordinates) => {
  // debugger
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(coordinates[0][0], coordinates[0][1]);
  for (let i = 1; i < coordinates.length; i++) {
    context.lineTo(coordinates[i][0], coordinates[i][1]);
  }
  // context.closePath();
  context.stroke();
  return true;
};
