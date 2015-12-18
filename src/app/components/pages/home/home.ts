import {Component} from 'angular2/core';
import {StoriesAutoList} from "../../layout/story/StoriesAutoList/StoriesAutoList";

@Component({
  selector: 'page-home',
  directives: [StoriesAutoList],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class PageHome {
  constructor() {

  }
}
