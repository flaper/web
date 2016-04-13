import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Title} from "angular2/platform/browser"
import {FlapSyncService, FLAP_SYNC_SERVICE_PROVIDER} from "../../../../services/flap/FlapSyncService";

@Component({
  selector: 'page-flap-sync',
  template: require('./PageFlapSync.html'),
  providers: [FLAP_SYNC_SERVICE_PROVIDER],
  styles: [require('./PageFlapSync.scss')]
})
export class PageFlapSync {
  id:number;

  constructor(ts:Title, routeParams:RouteParams, flapSyncService:FlapSyncService) {
    this.id = routeParams.params['id'];
    ts.setTitle('Синхронизация объекта');
    flapSyncService.sync(this.id)
      .subscribe(data => {
        console.log(data);
      })
  }
}
