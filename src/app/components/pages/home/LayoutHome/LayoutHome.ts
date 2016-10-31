import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'layout-home',
  template: require('./LayoutHome.html'),
  styles: [require('./LayoutHome.scss')]
})
export class LayoutHome {
  @Input()
  page:string = null;

  constructor(private router:Router) {
  }
}
