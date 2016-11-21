import {Component} from '@angular/core';
import {LocationService,StoryService,Story} from '@flaper/angular';

@Component({
  selector: 'news',
  template: require('./News.html'),
  styles: [require('./News.scss')]
})
export class News {
  relatedStories:Story[] = [];
  domain:string="";
  region:string="";
  relatedMessage:string="";
  constructor(private _location:LocationService, private _story:StoryService) {
    this.domain = _location.getCurrentDomain();
    this.region = _location.getCurrentRegion();
    let filter = {
          where: this.domain === 'места' ? {domains:this.domain,region:this.region} : {domains:this.domain},
          limit: 3,
          offset: 0,
          order: "created DESC"
        };
    if (this.domain)
    _story.get(filter).subscribe(
      stories =>  {
        this.relatedStories = stories;
      }
    );
  }
}
