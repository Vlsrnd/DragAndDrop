// open trash list, return trashList
function openTrash() {
  if (!trashCollection.size) {
    trash.style.transform = 'scale(1.2)';
    setTimeout(() => {
      trash.style.transform = 'scale(1)';
    }, 100) 
  } else {

    const mainTrashElement = document.createElement('div');
    document.body.append(mainTrashElement);
    mainTrashElement.style.top = trash.offsetTop - 50 + 'px';
    mainTrashElement.style.left = trash.offsetLeft - 20 + 'px';
    mainTrashElement.classList.add('trash__list');

    const trashList = Array.from(trashCollection.entries())
                            .map(elem => [elem[0], elem[1].value]);
    trashList.forEach((elem, index) => {
      const deletedElem = document.createElement('div');
      deletedElem.textContent = elem[1];
      deletedElem.dataset.index = index;
      console.log(elem[0]);
      mainTrashElement.append(deletedElem);

      //add listener
      mainTrashElement.addEventListener('click', (e) => {
        console.log(e.target);
        window.requestAnimationFrame(() => {
          mainTrashElement.style.height = '0px';
        });
          mainTrashElement.addEventListener('transitionend', () => {
            mainTrashElement.remove();
          })
      });
    })
    window.requestAnimationFrame(() => {
      mainTrashElement.style.width = trash.clientWidth + 40 + 'px';
      mainTrashElement.style.height = trash.clientHeight + 50 + 'px';
    })
  }
  return trashList;
}