export {drawModeFunction};

const drawModeFunction = (canvas, context, coordinates) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 3;
  for (let i = 0; i < coordinates.length; i++) {
    if (coordinates[i] === 'start') context.beginPath();
    if (coordinates[i - 1] === 'start') {
      context.moveTo(coordinates[i][0], coordinates[i][1]);
    }
    context.lineTo(coordinates[i][0], coordinates[i][1]);
    context.stroke();
  }
  return true;
};
