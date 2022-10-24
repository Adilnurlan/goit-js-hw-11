const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
stopBtn.disabled = true;
let isActive = false;
let timerId = null;
startBtn.addEventListener('click', () => {
  if (isActive) {
    return;
  }
  isActive = true;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
});
stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

// function onStartBtn(evt) {
//   setInterval(() => {
//       timerId = body.style.backgroundColor = getRandomHexColor()
//     }, 1000)
// }

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// function onStopBtn(evt) {
//   clearInterval(timerId);
// }
