export {createGradient};

const createGradient = (canvas, context) => {
  canvas.setAttribute('width', canvas.parentElement.clientWidth);
  canvas.setAttribute('height', canvas.parentElement.clientHeight);
  const gradient = context.createLinearGradient(0,0, canvas.width, 0);
  gradient.addColorStop(0.0, '#000');
  gradient.addColorStop(0.03, '#000');
  gradient.addColorStop(0.04, '#fff');
  gradient.addColorStop(0.07, '#fff');
  
  for (let i = 0.2, j = 0; i <= 1; i += 0.1, j += 45 ) {
    gradient.addColorStop(i, `hsl(${j}, 50%, 50%)`);
    gradient.addColorStop(i -0.02, `hsl(${j}, 100%, 50%)`);
  }
  context.fillStyle = gradient;
  context.fillRect(0,0, canvas.width, canvas.height)
};
