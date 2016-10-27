import {Component, Input} from "@angular/core"
import {SubscriptionService} from "@flaper/angular"

@Component({
  selector: 'subscribe',
  providers: [SubscriptionService],
  styles: [require('./SubscribeButton.scss')],
  template: require('./SubscribeButton.html'),
})

export class SubscribeButton {
  @Input()
  targetId:string;
  @Input()
  iconMode:boolean;
  state:boolean;
  constructor(private _subscriptions:SubscriptionService) {

  }
  ngOnInit() {
    this._subscriptions.requestInfo([this.targetId]);
    this._subscriptions.ifHasObservable(this.targetId).subscribe(sub => {
      this.state = !!sub;
    });
  }
  toggle() {
    this._subscriptions.toggle(this.targetId)
    .subscribe(
      data => {
      },
      err => {
        this.state = false;
      }
    )
  }
}
