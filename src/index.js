import './css/styles.css';
import { fetchCountries } from './fetchcountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

list.innerHTML = '';
info.innerHTML = '';

function getData(name) {
  fetchCountries(name).then(data => {
    if (data.length === 1) {
      list.innerHTML = '';
      renderDataOne(data);
    } else if (data.length >= 2 && data.length <= 10) {
      info.innerHTML = '';
      renderData(data);
    } else {
      list.innerHTML = '';
      info.innerHTML = '';
      Notify.info('Too many matches found. Please enter a more specific name.');
    }
  })
  .catch(() => {
          Notify.failure('Oops, there is no country with that name');
        });
}

function renderData(data) {
  data.map(item =>
    list.insertAdjacentHTML(
      'afterbegin',
      `<li><p>
  <img width="20px" height="15px" src="${item.flags.svg}">
  ${item.name.official}</p></li>`
    )
  );
}

function renderDataOne(data) {
  data.map(item =>
    info.insertAdjacentHTML(
      'afterbegin',
      `<p style=" font-size: 40px;
font-weight: bold;">
<a style="text-decoration: none; color: inherit"><img width="50px" height="40px" src="${
        item.flags.svg
      }"> ${item.name.official}</a>
</p>

<p><span style="font-weight: bold">Capital:</span> ${item.capital}</p>
<p><span style="font-weight: bold">Population:</span> ${item.population}</p>
<p><span style="font-weight: bold">Languages:</span> ${Object.values(
        item.languages
      )}</p>`
    )
  );
}

input.addEventListener(
  'input',
  debounce(event => {
    getData(event.target.value.trim());
  }, DEBOUNCE_DELAY)
);
