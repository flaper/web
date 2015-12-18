import {Component} from 'angular2/core';
import {StoriesAutoList} from "../story/StoriesAutoList/StoriesAutoList";

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
