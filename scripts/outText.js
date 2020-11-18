//I/O = - / true
function updateTextList() {
  textList = [...Array.from(elements.entries()).map(elem => [elem[0], +elem[1].level, elem[1].value])];
  return true;
}

//list as [element, level, value] / output: list
function updateOutputList(list){
  let outputStructure = list.join('');
  outputList.innerHTML = '<h2>Structure</h2>' + outputStructure;
  return list;
}

//I/O = collection (Map), array / array
//For first run getOutputStructure(elements, [firstElement])
function getOutputStructure(col, arr) {
  if (arr.length < 1) return '';
  const result = [];
  result.push('<ul>');
  arr.forEach(elem => {
  if (col.has(elem)) {
  result.push([`<li>${col.get(elem).value}`,
  getOutputStructure(col, col.get(elem).children)]);
  }
  })
  result.push('</li></ul>');
  return result.flat(Infinity).filter(Boolean);
}