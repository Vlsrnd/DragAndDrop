export const drawModeFunction = (canvas, context, coordinates) => {
  for (let i = 0; i < coordinates.length; i++) {
    if (coordinates[i].color) {
      context.lineWidth = coordinates[i].lineWidth;
      context.strokeStyle = coordinates[i].color;
      context.beginPath();
    }
    else if (coordinates[i - 1].color) context.moveTo(coordinates[i][0], coordinates[i][1]);
    else context.lineTo(coordinates[i][0], coordinates[i][1]);
  }
  context.stroke();
  return true;
};