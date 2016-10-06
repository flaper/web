import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Story, StoryService} from "@flaper/angular";
// import {DomSanitizer} from "@angular/browser-platform";
import * as Diff from "text-diff";

@Component({
  selector: "page-story-changes",
  styles: [require("./PageStoryChanges.scss")],
  template : require("./PageStoryChanges.html")
})

export class PageStoryChanges {
  history = [];
  diff;
  constructor(private storyService:StoryService, private route:ActivatedRoute) {
    route.params.subscribe(params => {
      let {id} = params;
      storyService.getAudit(id).subscribe(data => {
        for (let i = 0; i < data.length - 1 ; i++) {
          this.history.push({new : data[i], old : data[i+1]});
        }
      });
    });
    this.diff= new Diff();
  }

  getFields(record) {
    let oldFields = Object.keys(record.old.fields),
        newFields = Object.keys(record.new.fields),
        fields = oldFields.filter(field => newFields.indexOf(field) == -1).concat(newFields).filter(field => record.old.fields[field] || record.new.fields[field]);
    return fields.map( field => {
        let oldValue = record.old.fields[field],
            newValue = record.new.fields[field];
        if (oldValue && newValue) {
          let difference = this.diff.main(oldValue, newValue);
          oldValue = difference.filter(item => item[0] !== 1).map(item => item[0] === -1 ? `<span class='text-danger'>${item[1]}</span>` : item[1] ).join();
          newValue = difference.filter(item => item[0] !== -1).map(item => item[0] === 1 ? `<span class='text-success'>${item[1]}</span>` : item[1] ).join();
        }
        return {key:field, oldValue : oldValue, newValue: newValue};
      } );
  }
}
