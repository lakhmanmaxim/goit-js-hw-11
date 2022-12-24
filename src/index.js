import { ApiService } from './apiService.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');
const inputSearch = document.querySelector('[name="searchQuery"]');
const loadMore = document.querySelector('.btn');

const ApiRequest = new ApiService();

inputSearch.addEventListener(
  'input',
  debounce(onInputEnteredValue, DEBOUNCE_DELAY)
);

searchForm.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onLoadMore);

function onInputEnteredValue(evt) {
  const inputValue = evt.target.value;
  // // console.log(inputValue);

  // if (inputValue === '') {
  //   clearOutput();
  //   Notiflix.Report.warning(
  //     'Your request is EMPTY',
  //     'Please enter a more specific request.',
  //     'OK'
  //   );
  //   return;
  // }
  // clearOutput();
}

function onFormSubmit(evt) {
  evt.preventDefault();

  ApiRequest.query = evt.currentTarget.elements.searchQuery.value.trim();

  if (ApiRequest.query === '') {
    Notiflix.Report.warning(
      'Your request is EMPTY',
      'Please enter a more specific request.',
      'OK'
    );
    clearOutput();
    return;
  }

  ApiRequest.fetchRequest(); //then(createMarkup).catch(catchError);
}

function onLoadMore() {
  if (ApiRequest.query === '') {
    Notiflix.Report.warning(
      'Your request is EMPTY',
      'Please enter a more specific request.',
      'OK'
    );
    clearOutput();
    return;
  }
  ApiRequest.fetchRequest();
}

function clearOutput() {
  ApiRequest.query = '';
}

function catchError(error) {
  Notiflix.Report.warning(
    'WRONG REQUEST',
    'Oops, not found...',
    'Enter new request'
  );
}
