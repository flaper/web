import {Injectable} from '@angular/core';
import {ApiService} from "./../ApiService";

@Injectable()
export class ManageRequestService {

  constructor(private api:ApiService) {
  }


  get({where, order = "", skip = 0}) {
    let filter = JSON.stringify({where: where, order: order, skip: skip});
    return this.api.request('get', 'ManageRequests', {filter: filter});
  }

  getBySubjectId(subjectId) {
    return this.get({where: {subjectId: subjectId}}).map(data => data.length ? data[0] : null)
  }

  post(data) {
    return this.api.request('post', 'ManageRequests', data);
  }

  del(id) {
    return this.changeStatus(id, 'delete');
  }

  private changeStatus(id, action) {
    let observable = this.api.request('put', `ManageRequests/${id}/status/${action}`).publishLast();
    observable.connect();
    return observable;
  }
}

export let MANAGE_REQUEST_SERVICE_PROVIDER = [ManageRequestService];
