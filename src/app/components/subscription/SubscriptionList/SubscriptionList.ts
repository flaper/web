import {Component, Input} from "@angular/core";
import {Subscription,UserService,ObjectService} from "@flaper/angular";
import {SubscriptionItem} from "../SubscriptionItem/SubscriptionItem";

@Component({
  selector:"subscription-list",
  entryComponents: [SubscriptionItem],
  styles: [require('./SubscriptionList.scss')],
  template: require('./SubscriptionList.html')
})

export class SubscriptionList {
  @Input()
  subscriptions:Subscription[];
  @Input()
  displayType:string;
  constructor(private _users:UserService) {

  }
}
