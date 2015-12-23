/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Story} from "../../../models/common/Story";
import {TimeAgoPipe} from 'angular2-moment';
import {UserLink} from "../../user/UserLink/UserLink";
import {ACL} from "../../../acl/ACL";
import {SimpleCreate} from "../create/SimpleCreate/SimpleCreate";

@Component({
  selector: 'story',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, UserLink],
  pipes: [TimeAgoPipe],
  styles: [require('./Story.scss')],
  template: require('./Story.html')
})
export class StoryComponent {
  @Input()
  story:Story;

  constructor(private acl:ACL) {
  }
}
