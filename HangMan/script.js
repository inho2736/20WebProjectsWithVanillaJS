const RAMDOM_WORD = ['apple', 'banana', 'peach'];

let hiddenWord;
let correctLetters;
let pressedLetters;
let wrongLetters;
let correctCount;
let deathCount;

const word = document.querySelector('#word');
const notification = document.querySelector('#notification-container');
const wrong = document.querySelector('#wrong-letters');
const popUp = document.querySelector('#popup-container');
const finalMessage = document.querySelector('#final-message');
const playBtn = document.querySelector('#play-button');

document.addEventListener('keypress', onKeyPress);
playBtn.addEventListener('click', init);

function onKeyPress(e) {
  const key = e.key;
  if (pressedLetters.includes(key)) {
    showNotification();
    return;
  }
  pressedLetters.push(key);

  let index = hiddenWord.indexOf(key);
  if (index !== -1) {
    handleCorrectKey(key, index);
  } else {
    handleWrongKey(key);
  }
}

function handleWrongKey(key) {
  wrongLetters.push(key);
  const str = wrongLetters.reduce((acc, cur) => {
    return acc + `<span>${cur}</span>,`;
  }, `<p>Wrong</p>`);
  wrong.innerHTML = str.substring(0, str.length - 1);
  deathCount++;
  drawHangman();
  if (deathCount == 6) {
    endGame(`Unfortunately You lost😟`);
  }
}

function handleCorrectKey(key, index) {
  while (index !== -1) {
    correctLetters[index] = key;
    correctCount++;
    index = hiddenWord.indexOf(key, index + 1);
  }
  updateWordBlocks();
  if (correctCount == hiddenWord.length) {
    endGame(`Congratulations! You Won 😟`);
  }
}

function endGame(message) {
  finalMessage.textContent = message;
  popUp.style.display = 'flex';
}

function showNotification() {
  notification.classList.add('show');
  const timer = setTimeout(() => {
    notification.classList.remove('show');
    clearTimeout(timer);
  }, 2000);
}

function drawHangman() {
  const figurePart = document.querySelector(`.figure-container *:nth-child(${4 + deathCount})`);
  figurePart.style.display = 'inline';
}

function updateWordBlocks() {
  correctLetters.forEach((a) => {});
  word.innerHTML = correctLetters.reduce((acc, cur) => {
    return acc + `<span class="letter">${cur ? cur : ''}</span>`;
  }, '');
}

function clean() {
  popUp.style.display = 'none';
  const figurePart = document.querySelectorAll('.figure-part');
  [...figurePart].forEach((line) => {
    line.style.display = 'none';
  });
  wrong.innerHTML = '';
}

function init() {
  clean();
  correctLetters = [];
  pressedLetters = [];
  wrongLetters = [];
  correctCount = 0;
  deathCount = 0;
  hiddenWord = RAMDOM_WORD[Math.floor(Math.random() * RAMDOM_WORD.length)];
  correctLetters = new Array(hiddenWord.length);
  // 배열을 Empty로 하면 순회를 무시함 -> undefined로 채워넣기
  correctLetters.fill();
  updateWordBlocks();
}

init();
