import { SERVER_URL } from '@config/index';
import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export default http;
