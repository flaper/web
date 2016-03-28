import {Component} from 'angular2/core';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {PageService} from "../../../../services/helpers/PageService";

@Component({
  selector: 'page-news',
  directives: [LayoutHome],
  template: require('./PageNews.html')
})
export class PageNews {
  constructor(pageService:PageService) {
    pageService.setDefault('News')
  }
}
