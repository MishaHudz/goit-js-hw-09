// Описаний в документації
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minCounter = document.querySelector('[data-minutes]');
const secCounter = document.querySelector('[data-seconds]');
const inputFild = document.querySelector('#datetime-picker');
let selectedDate = null;
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() < 0) {
      startButton.disabled = true;
      return alert('Please choose a date in the future');
    }
    startButton.disabled = false;
    selectedDate = selectedDates[0].getTime();
  },
};
flatpickr('#datetime-picker', options);

startButton.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  startButton.disabled = true;
  inputFild.disabled = true;
  const setIntervalId = setInterval(() => {
    const changableTime = selectedDate - Date.now();

    if (changableTime <= 0) {
      clearInterval(setIntervalId);
      inputFild.disabled = false;
      return;
    }

    const timeObj = convertMs(changableTime);
    const { days, hours, minutes, seconds } = timeObj;
    daysCounter.textContent = days;
    hoursCounter.textContent = hours;
    minCounter.textContent = minutes;
    secCounter.textContent = seconds;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
