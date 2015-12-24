/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {Story} from "../../../models/common/Story";
import {TimeAgoPipe} from 'angular2-moment';
import {UserLink} from "../../user/UserLink/UserLink";
import {ACL} from "../../../acl/ACL";

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

  constructor(private acl:ACL) {
  }
}
