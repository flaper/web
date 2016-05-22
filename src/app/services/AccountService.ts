import {Injectable} from '@angular/core';
import {ApiService} from 'flaper';

@Injectable()
export class AccountService {
  constructor(private api:ApiService) {
  }

  getAmountById(id) {
    return this.api.request('get', `accounts/${id}`)
      .map(data => data.amount);
  }
}

export let ACCOUNT_SERVICE_PROVIDER = [AccountService];
