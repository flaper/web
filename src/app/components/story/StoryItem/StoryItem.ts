/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Story} from "../../../models/common/Story";
import {UserLink} from "../../user/UserLink/UserLink";
import {TimeAgoPipe} from 'angular2-moment';

@Component({
  selector: 'story-item',
  directives: [RouterLink, UserLink],
  pipes: [TimeAgoPipe],
  styles: [require('./StoryItem.scss')],
  template: require('./StoryItem.html')
})
export class StoryItem {
  @Input()
  story:Story;
  @Input()
  showAuthor:boolean = true;

  constructor() {
  }
}
