import {Component} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Title} from "@angular/platform-browser"
import {FlapSyncService, FLAP_SYNC_SERVICE_PROVIDER} from "../../../../services/flap/FlapSyncService";
import {ObjectService} from "@flaper/angular";

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
    let action = routeParams.params['action'];
    ts.setTitle('Синхронизация объекта');
    flapSyncService.sync(this.id)
      .subscribe(data => {
        this.objectService.navigateTo(data, action);
      })
  }
}
