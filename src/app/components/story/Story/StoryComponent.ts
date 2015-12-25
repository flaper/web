/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {Story} from "../../../models/common/Story";
import {TimeAgoPipe} from 'angular2-moment';
import {UserLink} from "../../user/UserLink/UserLink";
import {ACL} from "../../../acl/ACL";
import * as moment from 'moment';

@Component({
  selector: 'story',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, RouterLink, UserLink],
  pipes: [TimeAgoPipe],
  styles: [require('./StoryComponent.scss')],
  template: require('./StoryComponent.html')
})
export class StoryComponent {
  @Input()
  story:Story;

  private _moment;

  constructor(private acl:ACL) {
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
}
