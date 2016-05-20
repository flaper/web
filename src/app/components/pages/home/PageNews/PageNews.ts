import {Component} from '@angular/core';
import {LayoutHome} from "../LayoutHome/LayoutHome";
import {PageService} from "../../../../services/helpers/PageService";
import {Title} from "@angular/platform-browser"

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
