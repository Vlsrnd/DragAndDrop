export function edit(event) {
  if (event.target.dataset.func === 'edit') {
    event.target.previousSibling.textContent = '';
    event.target.nextElementSibling.classList.remove('hide');
    event.target.nextElementSibling.focus();
    
    function forListenerKeydown(event) {
      if (event.keyCode === 13) {
        event.target.parentNode.firstChild.textContent = event.target.value;
        elements.get(event.target.parentNode).value = event.target.value;
        updateTextList();
        updateOutputList(getOutputStructure(elements, [firstElement]));
        event.target.classList.add('hide');
        event.target.removeEventListener('keydown', forListenerKeydown);
      }
    }
    
    event.target.nextElementSibling.addEventListener('keydown', forListenerKeydown)
  }
}