import {Injectable} from '@angular/core';
import {ApiService} from '@flaper/angular';

@Injectable()
export class FlapSyncService {
  constructor(private api:ApiService) {
  }

  sync(flapId) {
    return this.api.request('post', 'objects/flapSync', {id: flapId});
  }
}

export let FLAP_SYNC_SERVICE_PROVIDER = [FlapSyncService];
