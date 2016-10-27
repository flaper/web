import {Component, Input} from '@angular/core';
import {UserService} from "@flaper/angular";
import {User} from "@flaper/angular";

@Component({
  selector: 'user-link',
  template: require('./UserLink.html')
})
export class UserLink {
  @Input()
  id:string;

  @Input()
  hiddenStatsXs:boolean = false;

  @Input()
  stats:boolean = true;

  user:User;

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    //noinspection TypeScriptUnresolvedFunction
    this.userService.getById(this.id).subscribe(user => this.user = user);
  }
}
