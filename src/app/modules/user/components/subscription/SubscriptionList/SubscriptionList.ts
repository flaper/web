import {Component, Input} from "@angular/core";
import {Subscription, UserService} from "@flaper/angular";

@Component({
  selector: "subscription-list",
  template: require('./SubscriptionList.html')
})

export class SubscriptionList {
  @Input()
  subscriptions: Subscription[];
  @Input()
  displayType: string;

  constructor(private _users: UserService) {

  }
}
