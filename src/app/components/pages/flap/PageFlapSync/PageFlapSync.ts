import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

  constructor(ts:Title, route:ActivatedRoute, flapSyncService:FlapSyncService, private objectService:ObjectService) {
    route.params.subscribe(params=> {
      this.id = params['id'];
      let action = params['action'];
      ts.setTitle('Синхронизация объекта');
      flapSyncService.sync(this.id)
        .subscribe(data => {
          this.objectService.navigateTo(data, action);
        })
    })
  }
}
