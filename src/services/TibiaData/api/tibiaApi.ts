import axios from 'axios';

const tibiaDataApi = axios.create({
  baseURL: 'https://api.tibiadata.com/v2',
});

export default tibiaDataApi;
