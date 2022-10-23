import Notiflix from 'notiflix';

const BtnForPromises = document.querySelector('button');
const inputDelay = document.querySelector('input[name = "delay"]');
const inputStep = document.querySelector('input[name = "step"]');
const inputAmount = document.querySelector('input[name = "amount"]');

BtnForPromises.addEventListener('click', dataPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const data = {
      position,
      delay,
    };
    setTimeout(() => {
      if (shouldResolve) {
        resolve(data);
      } else {
        reject(data);
      }
    }, delay);
  });
}

function dataPromise(evt) {
  evt.preventDefault();
  const delay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);
  console.log(delay)
  console.log(step)
  console.log(amount)
  for (let number = 0; number < amount; number += 1) {
    console.log(delay + step * number)
      createPromise(number + 1, delay + step * number)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }
}
