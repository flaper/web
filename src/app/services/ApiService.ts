import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class ApiService {
  constructor(public http:Http) {

  }
}

export let API_SERVICE_PROVIDER = [ApiService];
