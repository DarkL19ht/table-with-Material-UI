import axios from 'axios';
import config from '../config';

const HTTP = axios.create({
  baseURL: config.baseURL,
  timeout: config.httpTimeout,
});

export default HTTP;
