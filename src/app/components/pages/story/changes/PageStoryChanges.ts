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
  currentPage:number = 0;
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
      let filter = {order: 'created DESC'};
      this.history = [];
      _story.getAudit(id).subscribe(data => {  //requesting changes
        let presentFields = {};
        for (let i = 0; i < data.length; i++) {
          _user.getById(data[i].userId).subscribe(user => {
            let dataObject = data[i];
            for (let field in dataObject.fields) {
              if (!presentFields[field]) presentFields[field] = [];
              dataObject.fields[field] = {currentValue: dataObject.fields[field], oldValue: presentFields[field].length > 0 ? presentFields[field][presentFields[field].length - 1] : null};
              presentFields[field].push(dataObject.fields[field].currentValue);
            }
            dataObject.user = user;
            this.history.push(dataObject);
            if (i === data.length - 1)  {
              this.history.reverse();
              this.pages = Math.floor(this.history.length / this.pageSize);
            }
          })
        }
      });
    });
    this.diff = new Diff();
  }

  ngOnInit() {
  }
  nextPage() {
    if (this.currentPage === this.pages -1) return;
    this.currentPage++;
  }
  previousPage() {
    if (this.currentPage === 0) return;
    this.currentPage--;
  }
  getRecords()  {
    let offset = this.currentPage * this.pageSize;
    return this.history.slice(offset, offset + this.pageSize);
  }
  getFields(record) {
    // let oldFields = Object.keys(record.old.fields),
    //     newFields = Object.keys(record.current.fields),
    //     fields = oldFields.filter(field => newFields.indexOf(field) == -1).concat(newFields).filter(field => record.old.fields[field] || record.current.fields[field]);
    let fields = Object.keys(record.fields);
    return fields.map(field => {
      let oldValue = record.fields[field].oldValue.replace(/\n/g,"<br>"),
        currentValue = record.fields[field].currentValue.replace(/\n/g,"<br>");
      if (oldValue && currentValue && (oldValue.length >= this.minimumDiffLength || currentValue.length >= this.minimumDiffLength)) {
        let difference = this.diff.main(oldValue, currentValue);
        oldValue = difference.filter(item => item[0] !== 1).map(item => item[0] === -1 ? `<strong class='text-danger'>${item[1]}</strong>` : item[1]).join("");
        currentValue = difference.filter(item => item[0] !== -1).map(item => item[0] === 1 ? `<strong class='text-success'>${item[1]}</strong>` : item[1]).join("");
      }
      return {key: field, oldValue: this.t(oldValue), currentValue: this.t(currentValue)};
    });
  }

  t(text) {
    return this.dictionary[text] ? this.dictionary[text] : text;
  }
}
