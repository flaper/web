import {Component} from 'angular2/core';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {PageService} from "../../../../services/helpers/PageService";
import {Title} from "angular2/platform/browser"

@Component({
  selector: 'page-news',
  directives: [LayoutHome],
  template: require('./PageNews.html')
})
export class PageNews {
  constructor(pageService:PageService, ts: Title) {
    ts.setTitle('Активные');
    pageService.setDefault('News')
  }
}
