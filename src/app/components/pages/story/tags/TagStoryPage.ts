import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "tag-story-page",
  template: require("./TagStoryPage.html")
})

export class TagStoryPage {
  where:any;
  tag:string;
  constructor(private route:ActivatedRoute){
    route.params.subscribe(
      params => {
        this.tag = decodeURIComponent(params['tag']) || "";
        this.where = {tags:{inq:[this.tag]}}
      }
    )
  }
}
