'use strict';

// 메모할 것
// function 에 async 안붙여도 되는가? -> await 키워드 쓸때만
// 왜 느리지? -> 강사님꺼랑 api버전이 다름..
// fetch API 문서 정독
const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');

const amountOne = document.querySelector('#amount-one');
const amountTwo = document.querySelector('#amount-two');

const swapBtn = document.querySelector('#swap');
const rate = document.querySelector('#rate');

currencyOne.addEventListener('change', updateCurrency);
currencyTwo.addEventListener('change', updateCurrency);

swapBtn.addEventListener('click', () => {
  [currencyOne.value, currencyTwo.value] = [currencyTwo.value, currencyOne.value];
  updateCurrency();
});

function updateCurrency() {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;
  const amountOneValue = amountOne.value;
  fetch(`https://v6.exchangerate-api.com/v6/08207db910469df651335ade/latest/${currencyOneValue}`)
    .then((res) => res.json())
    .then((data) => {
      const result = data.conversion_rates[currencyTwoValue] * amountOneValue;
      amountTwo.value = result.toFixed(2);
      rate.textContent = `${amountOneValue} ${currencyOneValue} = ${result} ${currencyTwoValue}`;
    });
}
updateCurrency();
