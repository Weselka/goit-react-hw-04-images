import axios from 'axios';

const API_KEY = '30883328-4550d73a5a5d91ad50d778095';
axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: '12',
};

export const fetchImages = async (inputSearch, page) => {
  const { data } = await axios.get(
    `?key=${API_KEY}&q=${inputSearch}&page=${page}`
  );
  return data;
};