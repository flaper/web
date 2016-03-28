import {Component} from 'angular2/core';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {DefaultPageService} from "../../../../services/helpers/DefaultPageService";

@Component({
  selector: 'page-news',
  directives: [LayoutHome],
  template: require('./PageNews.html')
})
export class PageNews {
  constructor(defaultPage:DefaultPageService) {
    defaultPage.set('News')
  }
}
