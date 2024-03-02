import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tuk-erum.com/',
});

export default api;
