import {Component, Input} from "@angular/core";
import {Subscription, SubscriptionService} from "@flaper/angular";

@Component({
  selector: "subscription-auto-list",
  providers: [SubscriptionService],
  template: require('./SubscriptionAutoList.html')
})

export class SubscriptionAutoList {
  @Input()
  where;
  @Input()
  displayType: string;
  @Input()
  placeholder:string;
  subscriptions: Subscription[];

  constructor(private _subscriptions: SubscriptionService) {

  }

  ngOnInit() {
    this.getSubscriptions(this.where);
  }

  getSubscriptions(query) {
    this._subscriptions.get({where: query}).subscribe(data => {
      this.subscriptions = data
    });
  }

  ngOnChanges(changes) {
    if (changes.where) {
      this.where = changes.where.currentValue;
      this.getSubscriptions(this.where);
    }
  }
}
