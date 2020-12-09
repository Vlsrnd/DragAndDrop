export {editText}

const editText = (element) => {
  const input = element.querySelector('.element__input');
  const text = element.querySelector('.element__text');
  const btns = [...element.querySelectorAll('.element__btn')];
  text.classList.add('hide');
  input.classList.remove('hide');
  btns.forEach(elem => elem.classList.add('hide'));
  input.focus();
  input.addEventListener('change', () => {
    text.textContent = input.value;
    input.value = '';
    text.classList.remove('hide');
    input.classList.add('hide');
    setTimeout(() => btns.forEach(elem => elem.classList.remove('hide')), 1000);
  }, {once: true})
};


