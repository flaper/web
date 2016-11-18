import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "tag-story-page",
  styles: [require("./TagStoryPage.scss")],
  template: require("./TagStoryPage.html")
})

export class TagStoryPage {
  where:any;
  tag:string;
  order:string = "lastActive DESC";
  orderFields:any = [
    {name:"lastActive", title:"по дате активности"},
    {name:"likesNumber", title:"по количеству лайков"},
    {name:"created",title:"по дате создания"}
  ];
  constructor(private route:ActivatedRoute){
    route.params.subscribe(
      params => {
        this.tag = decodeURIComponent(params['tag']) || "";
        this.where = {tags:{inq:[this.tag]}}
      }
    )
  }
  onSort(value:string) {
    this.order = value;
  }
}
