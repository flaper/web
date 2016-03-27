import {Component} from 'angular2/core';
import {LayoutHome} from "../LayoutHome/LayoutHome";

@Component({
  selector: 'page-top-stories',
  directives: [LayoutHome],
  template: require('./PageLastStories.html')
})
export class PageLastStories {
}
