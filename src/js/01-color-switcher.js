const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let changeBGColorID = null;
startButton.disabled = false;
stopButton.disabled = true;

startButton.addEventListener('click', onButtonStartClick);
stopButton.addEventListener('click', onButtonStopClick);

function onButtonStartClick() {
  startButton.disabled = true;
  stopButton.disabled = false;
  changeBGColorID = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onButtonStopClick() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(changeBGColorID);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
