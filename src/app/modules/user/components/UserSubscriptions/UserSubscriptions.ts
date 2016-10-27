import {Component} from '@angular/core';
import {User,UserService} from "@flaper/angular";
import {PageUser} from "../../PageUser/PageUser";

@Component({
  selector: 'page-user-subscriptions',
  styles: [require('./UserSubscriptions.scss')],
  template: require('./UserSubscriptions.html')
})
export class UserSubscriptions {
  user:User;
  page:string = 'subscriptions';
  query;
  constructor(private _user:UserService) {
    PageUser.UserObservable.subscribe(user=> {
      this.user = user;
    });
  }
  ngOnInit() {
    this.query = this.getQuery();
  }
  show(page:string) {
    if (page === this.page) return;
    this.page = page;
    this.query = this.getQuery();
  }
  isActive(page:string) {
    return this.page === page;
  }
  getQuery() {
    return this.isActive('subscriptions') ? {userId:this.user.id} : {targetId:this.user.id};
  }
}
