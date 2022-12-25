import axios from 'axios';

export class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchRequest() {
    const URL = 'https://pixabay.com/api/';

    const API_KEY = '32163007-39541f17b63243672bcfecf36';

    const PAGE_REQUEST_OPTIONS = `&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;

    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${this.searchQuery}${PAGE_REQUEST_OPTIONS}`
    );

    const data = response.data;
    // console.log(data);

    return data;
  }

  //   return fetch(
  //     `${URL}?key=${API_KEY}&q=${this.searchQuery}${PAGE_REQUEST_OPTIONS}`
  //   )
  //     .then(response => response.json())
  //     .then(data => {
  //       this.incrementPage();
  //       return data;
  //     });
  // }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
