export default class ApiService {
  constructor() {}

  fetchRequest(inputValue) {
    const URL = 'https://pixabay.com/api/';

    const API_KEY = '32163007-39541f17b63243672bcfecf36';

    fetch(
      `${URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
    ).then(response => response.json());
  }
}
