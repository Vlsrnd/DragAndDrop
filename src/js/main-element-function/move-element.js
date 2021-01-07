export const moveElement = (element, coord, limitAreaObj) => {
  const x = coord.clientX - limitAreaObj.offsetLeft - element.clientWidth / 2;
  const y = coord.clientY - limitAreaObj.offsetTop - element.clientHeight / 2;
  element.style.left = Math.max(
                        0, 
                        Math.min(x, limitAreaObj.clientWidth - element.clientWidth))
                        + 'px';
  element.style.top = Math.max(
                        0, 
                        Math.min(y, limitAreaObj.clientHeight - element.clientHeight))
                        + 'px';
};