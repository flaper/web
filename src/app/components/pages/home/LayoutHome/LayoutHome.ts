import {Component, Input} from '@angular/core';
import {Router, Instruction, ComponentInstruction} from '@angular/router-deprecated';
import {LastStories} from "../PageLastStories/Content/LastStories";
import {TopStories} from "../PageTopStories/Content/TopStories";
import {News} from "../PageNews/Content/News";

@Component({
  selector: 'layout-home',
  directives: [LastStories, TopStories, News],
  template: require('./LayoutHome.html'),
  styles: [require('./LayoutHome.scss')]
})
export class LayoutHome {
  @Input()
  page:string = null;

  constructor(private router:Router) {
  }
}
