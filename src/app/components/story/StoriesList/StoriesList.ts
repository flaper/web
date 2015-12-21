/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {UserService} from "../../../services/UserService";
import {Story} from "../../../models/common/Story";
import {StoryItem} from "../StoryItem/StoryItem";

@Component({
  selector: 'stories-list',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, StoryItem],
  pipes: [],
  styles: [require('./StoriesList.scss')],
  template: require('./StoriesList.html')
})
export class StoriesList {
  @Input()
  stories:Story[] = [];
  @Input()
  showAuthor:boolean = true;

  constructor() {
  }
}
