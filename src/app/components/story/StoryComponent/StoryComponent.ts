/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {Story} from "../../../models/common/Story";
import {TimeAgoPipe} from 'angular2-moment';
import {ACL} from "../../../acl/ACL";
import * as moment from 'moment';
import {LikeComponent} from "../../like/LikeComponent/LikeComponent";
import {UserLink} from "../../user/UserLink/UserLink";
import {UserAvatar} from "../../user/UserAvatar/UserAvatar";
import {StoryService} from "../../../services/StoryService";
import {PostActions} from "../../post/PostActions/PostActions";

@Component({
  selector: 'story',
  directives: [RouterLink, UserLink, UserAvatar, LikeComponent, PostActions],
  pipes: [TimeAgoPipe],
  styles: [require('./StoryComponent.scss')],
  template: require('./StoryComponent.html')
})
export class StoryComponent {
  @Input()
  story:Story;

  private _moment;
  private actions = [
    {name: 'deny', title: 'Отклонить', icon: 'fa-ban', acl: 'Story.deny'},
    {name: 'delete', title: 'Удалить'}];

  constructor(private acl:ACL, private storyService:StoryService, private router:Router) {
    this._moment = moment;
  }

  showChangedTime() {
    let diff = this.story.updated.getTime() - this.story.created.getTime();
    //so at least 3 minutes has passed
    let ifSomeTimePassed = diff / 1000 > 60 * 3;
    let passedFromNow = Math.min((new Date()).getTime() - this.story.created.getTime(), 1);

    //so we e.g. don't care about 1 month if already 2 years passed
    let ifSignificant = diff / passedFromNow > 0.1;

    return ifSignificant && ifSomeTimePassed &&
      this._moment(this.story.created).fromNow() !== this._moment(this.story.updated).fromNow()
  }

  actionEvent(event) {
    console.log(event);
    let observable;
    switch (event) {
      case 'delete':
        observable = this.storyService.del(this.story.id);
        break;
      case 'deny':
        observable = this.storyService.deny(this.story.id);
        break;
      default:
        throw `Unsupported event ${event}`;
    }
    observable.subscribe(() => {
      this.router.navigate(['/Home']);
    })
  }
}
