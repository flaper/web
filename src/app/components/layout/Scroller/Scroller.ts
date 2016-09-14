import {Component} from '@angular/core';


@Component({
  selector: 'scroller',
  styles: [require('./Scroller.scss')],
  template: require('./Scroller.html')
})
export class Scroller {
  constructor() {
  }
  scrollToTop() {
    window.scrollTo(0,0);
  }
  isVisible():boolean {
    return window.scrollY !== 0;
  }
}
