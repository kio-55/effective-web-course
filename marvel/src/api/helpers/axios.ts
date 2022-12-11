import axios from 'axios';
import md5 from 'md5';

import env from '../../config/environments';
const ts = new Date().getMilliseconds();

const instanse = axios.create({
  baseURL: env.baseUrl,
  params: {
    ts: ts,
    apikey: env.publicKey,
    hash: md5(ts + env.privateKey + env.publicKey).toString()
  }
});

export default instanse;
