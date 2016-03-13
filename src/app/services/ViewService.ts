import {Injectable} from 'angular2/core';
import {ApiService} from "./ApiService";

@Injectable()
export class ViewService {
  constructor(private api:ApiService) {
  }

  post(id) {
    return this.api.request('post', 'views', {id: id}).publishLast().connect();
  }
}

export let VIEW_SERVICE_PROVIDER = [ViewService];
