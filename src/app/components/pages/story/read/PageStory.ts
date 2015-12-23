/// <reference path="../../../../../../typingsOurs/main.d.ts" />

import {Component} from 'angular2/core';
import {Story} from "../../../../models/common/Story";
import {StoryComponent} from "../../../story/Story/StoryComponent";

@Component({
  selector: 'page-story',
  directives: [StoryComponent],
  pipes: [],
  styles: [require('./PageStory.scss')],
  template: require('./PageStory.html')
})
export class PageStory {
  story:Story;

  constructor() {
  }
}
