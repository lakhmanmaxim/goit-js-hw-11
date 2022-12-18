const URL = 'https://pixabay.com/api/';

const API_KEY = '32163007-39541f17b63243672bcfecf36';

export function fetchRequest(input) {
  return fetch(`${URL}?key=${API_KEY}&q=${input}`).then(response =>
    response.json()
  );
  // .then(countries => countries)
  // .catch(error => {
  //   console.log(error);
  // });
}
