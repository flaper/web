import {Component, Input} from "@angular/core";


@Component({
  selector : "page-navigator",
  styles:[require('./PageNavigator.scss')],
  template: require('./PageNavigator.html')
})


export class PageNavigator {
  @Input()
    baseURL:any[];
  @Input()
    currentPage:number;
  @Input()
    pageCount:number;
  constructor() {

  }
  getPagination() {
    let pages = [this.currentPage - 2 , this.currentPage - 1, this.currentPage , this.currentPage + 1 , this.currentPage + 2 ].filter(page => page > 0 && page <= this.pageCount);
    return pages;
  }
  getRouterLink(page:any)  {
    switch(page) {
      case 'previous' :
        return  this.baseURL.concat((this.currentPage <= 1 ? 1 : this.currentPage - 1));
      case 'next' :
        return  this.baseURL.concat((this.currentPage >= this.pageCount ? this.pageCount : this.currentPage + 1));
      default :
        return  this.baseURL.concat(page);
    }
  }
}
