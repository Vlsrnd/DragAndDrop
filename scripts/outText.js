export {updateTextList, updateOutputList, getOutputStructure};

//I/O = changable var, collection of elements / array
function updateTextList(textList, collection) {
  textList = [...Array.from(collection.entries()).map(elem => [elem[0], +elem[1].level, elem[1].value])];
  return textList;
}

//list as [element, level, value], element which need to update / output: list
function updateOutputList(list, outputList){
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