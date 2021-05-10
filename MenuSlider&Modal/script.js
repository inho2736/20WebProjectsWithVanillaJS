const toggleBtn = document.querySelector('#toggle');
const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector('#close');
const modal = document.querySelector('#modal');

openBtn.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});
