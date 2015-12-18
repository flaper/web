/// <reference path="../../../../../../typings/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {UserService} from "../../../../services/UserService";
import {Story} from "../../../../models/common/Story";

@Component({
  selector: 'story-item',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [],
  styles: [require('./StoryItem.scss')],
  template: require('./StoryItem.html')
})
export class StoryItem {
  @Input()
  story:Story;

  constructor() {
  }
}
