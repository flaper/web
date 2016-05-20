import {Component, Input} from '@angular/core';
import {UserService} from "../../../services/UserService";
import {User} from "../../../models/common/User";

@Component({
  selector: 'user-link',
  template: require('./UserLink.html')
})
export class UserLink {
  @Input()
  userId:string;

  @Input()
  hiddenStatsXs:boolean = false;

  user:User;

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.userService.getById(this.userId).subscribe(user => this.user = user);
  }
}
