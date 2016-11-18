import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "page-story-region",
  template: require('./PageStoryRegion.html')
})

export class PageStoryRegion {
  where:any;
  region:string;
  order:string = "lastActive DESC";
  orderFields:any = [
    {name:"lastActive", title:"по дате активности"},
    {name:"likesNumber", title:"по количеству лайков"},
    {name:"created",title:"по дате создания"}
  ];
  constructor(private route:ActivatedRoute){
    route.params.subscribe(
      params => {
        this.region = decodeURIComponent(params['region']) || "";
        this.where = {region:this.region}
      }
    )
  }
  onSort(value:string) {
    this.order = value;
  }
}
