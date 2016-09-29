import {Component,Input} from '@angular/core';
import {User} from '@flaper/angular'
@Component({
  selector: 'user-list',
  styles: [require('./UserList.scss')],
  template: require('./UserList.html')
})

export class UserList {
  @Input()
    users:User[] = [];
  constructor() {
    
  }
}
