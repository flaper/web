import {Component} from '@angular/core';
import {FObject, ObjectService} from '@flaper/angular';
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
  constructor(private _objects:ObjectService, private route:ActivatedRoute) {
    route.params.subscribe(params=> {
      let data = route.snapshot.data,
          page:number = parseInt(params['page']) || 1;
      this.searchText = decodeURIComponent(params['text']) || "";
      let query =  {or: [
          {region:{like:this.searchText}},
          {title:{like:this.searchText}},
          {mainDomain:{like:this.searchText}}
        ]},
        order = this.searchText === "" ? "created DESC" : "";
      if (page) this.currentPage = page;
      else this.currentPage = 0;
      _objects.count(query)
        .subscribe(data => {
          this.count = data.count;
          this.pages = Math.ceil(this.count / this.pageSize);
        })
      _objects.search(this.searchText,this.currentPage,order)
        .subscribe(objects => {
          this.objects = objects;
        });
    });
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
