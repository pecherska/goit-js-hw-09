import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMin = document.querySelector('[data-minutes]');
const dataSec = document.querySelector('[data-seconds]');



btnStart.addEventListener('click', startTimer);

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose 
};

function onClose(selectedDates) {
  if (selectedDates[0] > new Date) {
      btnStart.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  
}

const calendar = flatpickr(input, options);

function startTimer() {
  btnStart.disabled = true;
  input.disabled = true;
    const intervalId = setInterval(() => {
    const dateNow = new Date();
    const deltaTime = calendar.selectedDates[0] - dateNow;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    

    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMin.textContent = minutes;
    dataSec.textContent = seconds;
    
      if (deltaTime < 1000) {
        input.disabled = false;
        clearInterval(intervalId);
    }
  }, 1000);
    
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}