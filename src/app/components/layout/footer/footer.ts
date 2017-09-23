import {Component} from '@angular/core';

@Component({
  selector: 'footer',
  styles: [require('./footer.scss')],
  template: require('./footer.html')
})
export class Footer {
  constructor() {

  }

  year = Math.max(2016, (new Date().getFullYear()));
}
