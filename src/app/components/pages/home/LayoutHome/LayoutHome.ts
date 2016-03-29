import {Component, Input} from 'angular2/core';
import {Router, Instruction, ComponentInstruction} from 'angular2/router';
import {LastStories} from "../PageLastStories/Content/LastStories";
import {TopStories} from "../PageTopStories/Content/TopStories";
import {News} from "../PageNews/Content/News";

@Component({
  selector: 'layout-home',
  directives: [LastStories, TopStories, News],
  template: require('./LayoutHome.html')
})
export class LayoutHome {
  @Input()
  page:string = null;

  constructor(private router:Router) {
  }
}
