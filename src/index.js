import { fetchRequest } from './fetchRequest.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');
const inputSearch = document.querySelector('[name="searchQuery"]');

inputSearch.addEventListener(
  'input',
  debounce(onInputEnteredValue, DEBOUNCE_DELAY)
);

searchForm.addEventListener('submit', onFormSubmit);

function onInputEnteredValue(evt) {
  const inputValue = evt.target.value.trim();
  console.log(inputValue);

  if (inputValue === '') {
    clearOutput();
    Notiflix.Report.warning(
      'Your request is EMPTY',
      'Please enter a more specific request.',
      'OK'
    );
    return;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  fetchRequest(inputValue).then(createMarkup).catch(catchError);
}

// function createMarkup(countries) {
//   clearOutput();

//   if (countries.length > 10) {
//     // Notiflix.Report.warning(
//     //   'Too many matches found...',
//     //   'Too many matches found. Please enter a more specific name.',
//     //   'OK'
//     // );
//     Notiflix.Notify.failure(
//       'Too many matches found. Please enter a more specific name.'
//     );
//     // return;
//   } else if (countries.length === 1) {
//     clearOutput();
//     let lang = '';
//     const country = countries
//       .map(({ name, flags, capital, population, languages }) => {
//         for (let value in languages) {
//           lang = languages[value];
//         }

//         return `
//     <ul>
//       <li class="country-info_list"><img class="country-info_img" src="${flags.svg}" alt='Country flag' width='40' height ='25'><p class="country-info_country-text">${name.official}</p></li>
//       <li class="country-info_list">Capital: <p class="country-info_text">${capital}</p></li>
//       <li class="country-info_list">Population: <p class="country-info_text">${population}</p></li>
//       <li class="country-info_list">Languages: <p class="country-info_text">${lang}</p></li>
//     </ul>
//     `;
//       })
//       .join('');
//     countryInfo.insertAdjacentHTML('beforeend', country);
//   } else {
//     clearOutput();

//     const markup = countries
//       .map(({ name, flags }) => {
//         // console.log(name, flags);
//         return `
//       <li><img src="${flags.svg}" alt="flag" width='20' height ='15'> ${name.official}</li>
//       `;
//       })
//       .join('');
//     countryList.insertAdjacentHTML('beforeend', markup);
//   }
// }

function clearOutput() {
  inputValue = '';
}

// function catchError(error) {
//   Notiflix.Report.warning(
//     'WRONG REQUEST',
//     'Oops, there is no country with that name',
//     'Enter new request'
//   );
// }
