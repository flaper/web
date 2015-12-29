import {Component} from 'angular2/core';
import {StoriesAutoList} from "../../story/StoriesAutoList/StoriesAutoList";
import {PageTopStories} from "./topStories/topStories";

@Component({
  selector: 'page-home',
  directives: [StoriesAutoList, PageTopStories],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class PageHome {
  constructor() {

  }
}
