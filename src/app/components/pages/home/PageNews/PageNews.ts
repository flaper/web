import {Component} from 'angular2/core';
import {LayoutHome} from "../LayoutHome/LayoutHome";

@Component({
  selector: 'page-news',
  directives: [LayoutHome],
  template: require('./PageNews.html')
})
export class PageNews {
}
