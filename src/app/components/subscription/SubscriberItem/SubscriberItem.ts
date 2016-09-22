import {Component, Input} from "@angular/core";
import {User,FObject,Subscription,UserService,ObjectService} from "@flaper/angular";

@Component({
  selector: 'subscriber-item',
  styles: [require('./SubscriberItem.scss')],
  template: require('./SubscriberItem.html')
})

export class SubscriberItem {
  @Input()
  item:Subscription;
  @Input()
  displayType:string;
  user:User;
  object:FObject;
  displayName:string = "";
  subjectId:string;
  avatar:string;
  constructor(private _user:UserService, private _object:ObjectService) {

  }
  getRouterLink() {
    return this.user ? ['/u',this.user.id] : this.object ? ['/',this.object.mainDomain, this.object.region, this.object.slug,'-main'].filter(item => !!item) : [];
  }
  ngOnInit() {
    let property = this.displayType === "subscription" ? "targetId" : "userId";
    switch (this.item.subjectType) {
      case 'user' :
        this._user.getById(this.item[property]).subscribe(user => {
          this.displayName = user.displayName;
          this.user = user;
          this.subjectId = user.id;
          this.avatar = user.photo;
        });
        break;
      case 'FObject' :
        this._object.getById(this.item[property]).subscribe(object => {
          this.displayName = object.title;
          this.object = object;
          this.subjectId = object.id;
          this.avatar = object.flap.avatar;
        });
        break;
      default:
        break;
    }
  }
}
