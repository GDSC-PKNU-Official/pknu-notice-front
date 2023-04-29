import config from '@config/index';
import axios from 'axios';

const http = axios.create({
  baseURL: config.SERVER_URL,
});

export default http;
