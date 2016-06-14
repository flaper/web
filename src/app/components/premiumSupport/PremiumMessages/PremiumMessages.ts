import {Component, Input} from '@angular/core';

@Component({
  selector: 'premium-messages',
  template: require('./PremiumMessages.html'),
  styles: [require('./PremiumMessages.scss')],
})
export class PremiumMessages {
  @Input()
  messages = [];

  constructor() {
  }
}
