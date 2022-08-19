import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMin = document.querySelector('[data-minutes]');
const dataSec = document.querySelector('[data-seconds]');

let intervalId = null;

btnStart.addEventListener('click', startTimer);

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] > new Date) {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
    return selectedDates[0];
  },
};

const calendar = flatpickr(input, options);

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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// const calendars = flatpickr(".calendar", {});
// calendars[0] // flatpickr



function startTimer() {
  intervalId = setInterval(() => {
    const dateNow = new Date();
    const deltaTime = calendar.selectedDates[0] - dateNow;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    

    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMin.textContent = minutes;
    dataSec.textContent = seconds;

    btnStart.disabled = true;
    console.log(deltaTime);
    
    if (deltaTime < 1000) {
        clearInterval(intervalId);
    }
  }, 1000);
    
}

