import {Component, Input} from '@angular/core';
import {ACL, PremiumSupport, UserService} from '@flaper/angular'

@Component({
  selector: 'premium-messages',
  template: require('./PremiumMessages.html'),
  styles: [require('./PremiumMessages.scss')],
})
export class PremiumMessages {
  @Input()
  messages = [];

  constructor(private acl:ACL, private _user:UserService, private premiumSupport:PremiumSupport) {
  }

  removeMessage(message) {
    if (confirm('Удалить сообщение?')) {
      this.premiumSupport.del(message.id);
      this.messages = this.messages.filter(m => m.id !== message.id)
    }
  }
}
