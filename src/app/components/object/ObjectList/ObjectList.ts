import {Component, Input} from '@angular/core';
import {FObject} from '@flaper/angular';

@Component({
  selector:'object-list',
  styles:[require('./ObjectList.scss')],
  template: require('./ObjectList.html')
})

export class ObjectList {
  @Input()
    objects:FObject[];
  constructor(){

  }
  getRouterLink(object) {
    return object ? ['/',object.mainDomain, object.region, object.slug,'-main'].filter(item => !!item) : []
  }
}
