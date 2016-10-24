import {Injectable} from '@angular/core';
import {overlayConfigFactory} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';

@Injectable()
export class PopupService{
  host:any;
  initContainer(ref:any) {
    this.host = ref;
  }
  openPopup(title:string,body:any) {
    if (!this.host) throw new Error("Modal host has not been initialized");
    this.host.alert()
        .size('lg')
        .showClose(true)
        .title(title)
        .body(body)
        .open();
  }
  openCustom(ComponentRef:any,parameters:any = {}) {
    let config = overlayConfigFactory(parameters, BSModalContext);
    this.host.open(ComponentRef, config);
  }
}

export let POPUP_PROVIDER = [PopupService];
