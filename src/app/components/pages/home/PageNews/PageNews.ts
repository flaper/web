import {Component} from '@angular/core';
import {PageService} from "../../../../services/helpers/PageService";
import {Title} from "@angular/platform-browser"

@Component({
  selector: 'page-news',
  template: require('./PageNews.html')
})
export class PageNews {
  constructor(pageService:PageService, ts:Title) {
    ts.setTitle('Активные');
    pageService.setDefault('/p/news');
  }
}
