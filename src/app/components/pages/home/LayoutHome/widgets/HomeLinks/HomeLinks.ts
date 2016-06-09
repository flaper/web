import {Component, Input} from '@angular/core';

@Component({
  selector: 'home-links',
  template: require('./HomeLinks.html'),
  styles: [require('./HomeLinks2.scss')] //without 2 not working, strange!
})
export class HomeLinks {
  constructor() {
  }
}
