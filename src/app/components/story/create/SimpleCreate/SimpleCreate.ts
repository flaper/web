/// <reference path="../../../../../../typings/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {Story} from "../../../../models/common/Story";
import {StoryService} from "../../../../services/StoryService";
import {FormDraft} from "../../../../services/draft/FormDraft";

const DRAFT_KEY = 'CreateStory';
@Component({
  selector: 'simple-create',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  styles: [require('./SimpleCreate.scss')],
  template: require('./SimpleCreate.html')
})
export class SimpleCreate {
  form:ControlGroup;

  constructor(private storyService:StoryService, private fb:FormBuilder) {
    this.form = fb.group({
      title: '',
      content: ['', Validators.required]
    });

    FormDraft.load(DRAFT_KEY, this.form);
    this.form.valueChanges.subscribe(SimpleCreate.valueChanged);
  }

  static valueChanged(values) {
    FormDraft.save(DRAFT_KEY, values);
  }

}
