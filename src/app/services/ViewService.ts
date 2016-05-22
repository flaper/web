import {Injectable} from '@angular/core';
import {ApiService} from 'flaper';

@Injectable()
export class ViewService {
  constructor(private api:ApiService) {
  }

  post(id) {
    return this.api.request('post', 'views', {id: id}).publishLast().connect();
  }
}

export let VIEW_SERVICE_PROVIDER = [ViewService];
