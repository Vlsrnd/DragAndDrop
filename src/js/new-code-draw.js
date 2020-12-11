'use strict';

const canvas = document.getElementById('canvas-draw');
const ctx = canvas.getContext('2d');
const coord = [];

function addCoord(event) {
  coord.push([event.clientX, event.clientY])
};


const drawLinesOnCanvas = (canvas, context, coordinates) => {
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
const drawFuncForListener = (event) => {
  addCoord(event);
  drawLinesOnCanvas(canvas, ctx, coord);
}

canvas.setAttribute('width', document.body.clientWidth)
canvas.setAttribute('height', document.body.clientHeight)

canvas.addEventListener('mousedown', () => {
  canvas.addEventListener('mousemove', drawFuncForListener) 
});
canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', drawFuncForListener);
});