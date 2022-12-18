const URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(input) {
  return fetch(
    `${URL}${input}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
  // .then(countries => countries)
  // .catch(error => {
  //   console.log(error);
  // });
}
