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
  sortType:number=0;
  sortDirection:string = "DESC";
  sortFields:string[] = ["lastActive","likesNumber","created"];
  constructor(private route:ActivatedRoute){
    route.params.subscribe(
      params => {
        this.tag = decodeURIComponent(params['tag']) || "";
        this.where = {tags:{inq:[this.tag]}}
      }
    )
  }
  sort(type:number) {
    if (this.sortType === type) {
        this.sortDirection = this.sortDirection === 'DESC' ? 'ASC' : 'DESC';
    }
    else {
      this.sortType = type;
    }
  }
  getSort() {
    return `${this.sortFields[this.sortType]} ${this.sortDirection}`;
  }
}
