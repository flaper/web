import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import {Config} from '../config/Config';
const API_SERVER_URL = `http://${Config.api.host}:${Config.api.port}`;

export const API_BASE_URL = `${API_SERVER_URL}/api/`;

@Injectable()
export class ApiService {
  constructor(public http:Http) {

  }
}

export let API_SERVICE_PROVIDER = [ApiService];
