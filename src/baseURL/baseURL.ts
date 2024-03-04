import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tuk-erum.com/api/v1/',
});

export default api;
