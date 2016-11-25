import {Component} from '@angular/core';
import {FObject, ObjectService, SearchService, LocationService} from '@flaper/angular';
import {Router,ActivatedRoute} from '@angular/router';
import {PageNavigator} from "../../../layout/PageNavigator/PageNavigator";
import {ObjectSearchForm} from "../../../object/ObjectSearchForm/ObjectSearchForm";
// import {ObjectList} from '../../object/ObjectList/ObjectList';
@Component({
  selector: 'object-search',
  styles: [require('./ObjectSearch.scss')],
  template: require('./ObjectSearch.html')
})

export class ObjectSearch {
  objects:FObject[] = [];
  currentPage:number = 1;
  count:number = 0;
  pageSize:number = 10;
  pages:number = 0;
  searchText:string;
  constructor(private _objects:ObjectService, private route:ActivatedRoute, private _search:SearchService, private _location:LocationService) {
    route.params.subscribe(params=> {
      let data = route.snapshot.data,
          page:number = parseInt(params['page']) || 1;
      this.searchText = decodeURIComponent(params['text']) || "";
      if (page) this.currentPage = page;
      else this.currentPage = 0;
      this.search();
    });
  }
  search() {
    let domain = this._location.getCurrentDomain(),
        region = domain === 'места' ? this._location.getCurrentRegion() : null;
    this._search.search(this.searchText,domain,region)
    .subscribe(
      data => {
        this.count = data.hits.total;
        this.pages = Math.ceil(this.count / this.pageSize);
        this.objects = data.hits.hits.map(hit => hit._source);
      },
      error => {
        console.error(error);
        this.count = 0;
        this.pages = 0;
        this.objects = [];
      }
    )
  }
  getPagination() {
    let pages = [this.currentPage - 2 , this.currentPage - 1, this.currentPage , this.currentPage + 1 , this.currentPage + 2 ].filter(page => page > 0 && page <= this.pages);
    return pages;
  }
  getRouterLink(page:any)  {
    switch(page) {
      case 'previous' :
        return  ['/o',this.searchText, (this.currentPage === 0 ? 0 : this.currentPage - 1) ];
      case 'next' :
        return  ['/o',this.searchText, (this.currentPage === this.pages - 1 ? this.pages - 1 : this.currentPage + 1) ];
      default :
        return  ['/o',this.searchText, page];
    }
  }
}
