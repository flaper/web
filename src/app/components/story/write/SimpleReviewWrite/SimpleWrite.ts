import {Component, Input, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Location, FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {Story, StoryService} from "@flaper/angular";
import {SimpleWrite} from '../SimpleWrite/SimpleWrite';
import {DropzoneComponent} from "../../../image/dropzone/DropzoneComponent";
import {generateEvent} from "../../../../libs/common/common";

@Component({
  selector: 'simple-review-write',
  directives: [DropzoneComponent],
  styles: [require('../SimpleWrite/SimpleWrite.scss')],
  template: require('../SimpleWrite/SimpleWrite.html')
})
export class SimpleReviewWrite extends SimpleWrite {

  @Input()
  story:Story;

  getStoryData() {
    let data = this.form.value;
    data.type = 'review';
    if (this.story) {
      data.id = this.story.id;
    }
    return data;
  }


  // onCancel() {
  //   if (this.story) {
  //     this.router.navigate(['/s', this.story.slug]);
  //   } else {
  //     this._location.back();
  //   }
  // }
}
