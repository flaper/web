import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "page-story-domain",
  template: require('./PageStoryDomain.html')
})

export class PageStoryDomain {
  where:any;
  domain:string;
  order:string = "lastActive DESC";
  orderFields:any = [
    {name:"lastActive", title:"по дате активности"},
    {name:"likesNumber", title:"по количеству лайков"},
    {name:"created",title:"по дате создания"}
  ];
  constructor(private route:ActivatedRoute){
    route.params.subscribe(
      params => {
        this.domain = params['domain'] || "";
        this.where = {domains:this.domain}
      }
    )
  }
  onSort(value:string) {
    this.order = value;
  }
}
