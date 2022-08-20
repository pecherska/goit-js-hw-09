import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onBntCreateProm);

function onBntCreateProm(event) {
  event.preventDefault();

  const firstStep = Number(form.step.value);
  const step = Number(form.delay.value);
  const amount = Number(form.amount.value);

  let delay = firstStep;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
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
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
