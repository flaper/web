import {Component} from '@angular/core';
import {User,UserService} from "@flaper/angular";
import {PageUser} from "../../pages/user/PageUser/PageUser";
import {SubscriptionAutoList} from "../../subscription/SubscriptionAutoList/SubscriptionAutoList";

@Component({
  selector: 'page-user-subscriptions',
  entryComponents: [SubscriptionAutoList],
  styles: [require('./UserSubscriptions.scss')],
  template: require('./UserSubscriptions.html')
})
export class UserSubscriptions {
  user:User;
  page:string = 'subscriptions';
  query;
  // currentUser:User;
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
