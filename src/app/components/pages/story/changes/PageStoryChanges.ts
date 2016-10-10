import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Story, StoryService, User, UserService} from "@flaper/angular";
import {PageNavigator} from "../../../layout/PageNavigator/PageNavigator";
import * as Diff from "text-diff";


@Component({
  selector: "page-story-changes",
  styles: [require("./PageStoryChanges.scss")],
  template: require("./PageStoryChanges.html")
})

export class PageStoryChanges {
  storyId:string;
  history = [];
  dictionary = require('./i18n.json');
  minimumDiffLength:number = 100;
  currentPage:number = 1;
  pageSize:number = 10;
  pages:number = 0;
  diff;

  constructor(private _story:StoryService, private route:ActivatedRoute,
              private _user:UserService) {
    route.params.subscribe(params => {
      let {id, page} = params;     //story id & page number
      this.storyId = id;
      this.currentPage = parseInt(page) || 0;       // 0 = 1st page if page is not set

      // building query for pagination
      let filter = {offset: this.currentPage * this.pageSize, limit: this.pageSize + 1, order: 'created DESC'};
      this.history = [];
      _story.getAudit(id, filter).subscribe(data => {  //requesting changes
        for (let i = 0; i < data.length - 1; i++) {
          _user.getById(data[i].userId).subscribe(user => {
            this.history.push({user: user, current: data[i], old: data[i + 1]});
          })
        }
      });
    });
    this.diff = new Diff();
  }

  ngOnInit() {
  }

  getFields(record) {
    // let oldFields = Object.keys(record.old.fields),
    //     newFields = Object.keys(record.current.fields),
    //     fields = oldFields.filter(field => newFields.indexOf(field) == -1).concat(newFields).filter(field => record.old.fields[field] || record.current.fields[field]);
    let fields = Object.keys(record.current.fields);
    return fields.map(field => {
      let oldValue = record.old.fields[field],
        currentValue = record.current.fields[field];
      if (oldValue && currentValue && (oldValue.length >= this.minimumDiffLength || currentValue.length >= this.minimumDiffLength)) {
        let difference = this.diff.main(oldValue, currentValue);
        oldValue = difference.filter(item => item[0] !== 1).map(item => item[0] === -1 ? `<span class='text-danger'>${item[1]}</span>` : item[1]).join("");
        currentValue = difference.filter(item => item[0] !== -1).map(item => item[0] === 1 ? `<span class='text-success'>${item[1]}</span>` : item[1]).join("");
      }
      return {key: field, oldValue: this.t(oldValue), currentValue: this.t(currentValue)};
    });
  }

  t(text) {
    return this.dictionary[text] ? this.dictionary[text] : text;
  }

  getPagination() {
    return [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2].filter(page => page > 0 && page <= this.pages);
  }

  getRouterLink(page:any) {
    switch (page) {
      case 'previous':
        return ['/p', 'storyChanges', this.storyId, (this.currentPage === 0 ? 0 : this.currentPage - 1)];
      case 'next':
        return ['/p', 'storyChanges', this.storyId, (this.currentPage === this.pages - 1 ? this.pages - 1 : this.currentPage + 1)];
      default:
        return ['/p', 'storyChanges', this.storyId, page];
    }
  }
}
