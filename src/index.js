import { ApiService } from './apiService.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');
const inputSearch = document.querySelector('[name="searchQuery"]');

const ApiService = new ApiService();

inputSearch.addEventListener(
  'input',
  debounce(onInputEnteredValue, DEBOUNCE_DELAY)
);

searchForm.addEventListener('submit', onFormSubmit);

function onInputEnteredValue(evt) {
  const inputValue = evt.target.value;
  // console.log(inputValue);

  if (inputValue === '') {
    clearOutput();
    Notiflix.Report.warning(
      'Your request is EMPTY',
      'Please enter a more specific request.',
      'OK'
    );
    return;
  }
  clearOutput();
}

function onFormSubmit(evt) {
  evt.preventDefault();

  let inputValue = evt.currentTarget.elements.searchQuery.value;
  console.log(inputValue);

  ApiService.fetchRequest(inputValue); //.then(console.log); //then(createMarkup).catch(catchError);
}

function clearOutput() {
  inputValue = '';
}

function catchError(error) {
  Notiflix.Report.warning(
    'WRONG REQUEST',
    'Oops, not found...',
    'Enter new request'
  );
}
