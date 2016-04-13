import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Title} from "angular2/platform/browser"
import {FlapSyncService, FLAP_SYNC_SERVICE_PROVIDER} from "../../../../services/flap/FlapSyncService";
import {ObjectService} from "../../../../services/object/ObjectService";

@Component({
  selector: 'page-flap-sync',
  template: require('./PageFlapSync.html'),
  providers: [FLAP_SYNC_SERVICE_PROVIDER],
  styles: [require('./PageFlapSync.scss')]
})
export class PageFlapSync {
  id:string;

  constructor(ts:Title, routeParams:RouteParams, flapSyncService:FlapSyncService, private objectService:ObjectService) {
    this.id = routeParams.params['id'];
    ts.setTitle('Синхронизация объекта');
    flapSyncService.sync(this.id)
      .subscribe(data => {
        this.objectService.navigateTo(data);
      })
  }
}
