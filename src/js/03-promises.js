import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onBntCreateProm);

function onBntCreateProm(event) {
  event.preventDefault();

  let step = Number(form.step.value);
  let delay = Number(form.delay.value);
  let amount = Number(form.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(succes => {
        Notify.success(succes);
      })
      .catch(error => {
        Notify.failure(error);
      });
    delay += step;
  }
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
   return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
