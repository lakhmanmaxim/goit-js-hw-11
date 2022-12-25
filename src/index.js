import { ApiService } from './apiService.js';
import LoadMoreButton from './loadmore.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const DEBOUNCE_DELAY = 300;

const loadMoreButton = new LoadMoreButton({
  selector: '.load-more',
  hidden: true,
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchForm = document.querySelector('#search-form');
const inputSearch = document.querySelector('[name="searchQuery"]');
// const loadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

loadMoreButton.refs.button.addEventListener('click', onLoadMore);

const apiService = new ApiService();

searchForm.addEventListener('submit', onFormSubmit);
// loadMore.addEventListener('click', onLoadMore);

inputSearch.addEventListener(
  'input',
  debounce(onInputEnteredValue, DEBOUNCE_DELAY)
);

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

async function onFormSubmit(evt) {
  evt.preventDefault();

  // loadMoreButton.hide();

  apiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  apiService.resetPage();

  if (apiService.query === '') {
    Notiflix.Report.warning(
      'Your request is EMPTY',
      'Please enter a more specific request.',
      'OK'
    );
    clearOutput();
    return;
  }
  clearMarkup();
  await fetchPicture();
}

async function onLoadMore() {
  if (apiService.query === '') {
    Notiflix.Report.warning(
      'Your request is EMPTY',
      'Please enter a more specific request.',
      'OK'
    );
    clearOutput();
    return;
  }
  await fetchPicture();
}

async function fetchPicture() {
  await apiService
    .fetchRequest()
    .then(data => {
      // console.log(data);
      if (data.hits.length === 0) {
        Notiflix.Report.failure(
          'Hey...STOP',
          'Sorry, there are no images matching your search query. Please try again.',
          'OK'
        );
        return;
      }

      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      createMarkup(data.hits);
      apiService.incrementPage();
      lightbox.refresh();

      // console.log(data);
      const totalPage = data.totalHits / 40;
      console.log('fetchPicture ~ totalPage', totalPage);

      if (this.page >= totalPage) {
        loadMoreButton.hide();
        Notiflix.Report.failure(
          'Hello...',
          'We are sorry, but you are have reached the end of search results.',
          'OK'
        );
        return;
      }
      loadMoreButton.show();
    })
    .catch(error => {
      return error;
    });
}

//
//
//

function clearOutput() {
  apiService.query = '';
}

function clearMarkup() {
  gallery.innerHTML = '';
}

function catchError(error) {
  Notiflix.Report.warning(
    'WRONG REQUEST',
    'Oops, not found...',
    'Enter new request'
  );
}

function createMarkup(hits) {
  gallery.insertAdjacentHTML('beforeend', createTemplate(hits));
  // console.log(hits);
}

function createTemplate(cards = []) {
  return cards
    .map(
      card =>
        `
  <div class="photo-card">
    <a class "gallery-link" href="${card.largeImageURL}">
    <img class "gallery-image" src="${card.webformatURL}" alt="${card.tags}" loading="lazy" width="370" height="240"/>
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${card.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${card.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${card.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${card.downloads}</b>
      </p>
    </div>
  </div>
  `
    )
    .join('');
}
