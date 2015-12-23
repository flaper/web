/// <reference path="../../../../../../typingsOurs/main.d.ts" />

import {Component, Input, ElementRef} from 'angular2/core';
import {Router} from 'angular2/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
import {Story} from "../../../../models/common/Story";
import {StoryService} from "../../../../services/StoryService";
import {FormDraft} from "../../../../services/draft/FormDraft";
import {Autosize} from "../../../../directives/Autosize/Autosize";
import {AutoFocusIt} from "../../../../directives/AutoFocusIt/AutoFocusIt";
import {DropzoneComponent} from "../../../image/dropzone/DropzoneComponent";
import {generateEvent} from "../../../../libs/common/common";

const DRAFT_KEY = 'CreateStory';
@Component({
  selector: 'simple-create',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, AutoFocusIt, Autosize, DropzoneComponent],
  styles: [require('./SimpleCreate.scss')],
  template: require('./SimpleCreate.html')
})
export class SimpleCreate {
  form:ControlGroup;
  error:string;

  constructor(private storyService:StoryService, private fb:FormBuilder, private router:Router,
              private elementRef:ElementRef) {
    this.form = fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    FormDraft.load(DRAFT_KEY, this.form);
    this.form.valueChanges.subscribe(SimpleCreate.valueChanged);
  }

  static valueChanged(values) {
    FormDraft.save(DRAFT_KEY, values);
  }

  onSubmit(event) {
    if (this.form.valid) {
      let data = this.form.value;
      this.error = null;
      this.storyService.post(data).subscribe(() => {
        FormDraft.remove(DRAFT_KEY);
        this.router.navigate(['/Home'])
      }, (e) => {
        this.error = e.message;
      })
    }
  }

  newImage(image) {
    let control = <Control> this.form.controls['content'];
    let value = control.value;
    if (value.length && value[value.length - 1] !== '\n') {
      value += "\n";
    }
    value += `![](${image.Location})`;
    control.updateValue(value, {onlySelf: false, emitEvent: true});
    let el = this.elementRef.nativeElement.querySelector('textarea');
    el.dispatchEvent(generateEvent('autosize:update', {}));
  }
}
