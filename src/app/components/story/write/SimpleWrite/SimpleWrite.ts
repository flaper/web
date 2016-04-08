/// <reference path="../../../../../../typingsOurs/main.d.ts" />

import {Component, Input, ElementRef} from 'angular2/core';
import {Router} from 'angular2/router';
import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
import {Story} from "../../../../models/common/Story";
import {StoryService} from "../../../../services/story/StoryService";
import {FormDraft} from "../../../../services/draft/FormDraft";
import {AutoFocusIt} from "../../../../directives/AutoFocusIt/AutoFocusIt";
import {DropzoneComponent} from "../../../image/dropzone/DropzoneComponent";
import {generateEvent} from "../../../../libs/common/common";

@Component({
  selector: 'simple-write',
  directives: [AutoFocusIt, DropzoneComponent],
  styles: [require('./SimpleWrite.scss')],
  template: require('./SimpleWrite.html')
})
export class SimpleWrite {
  DRAFT_KEY = 'WRITE_STORY';

  @Input()
  story:Story;
  newStory:boolean;

  form:ControlGroup;
  error:string;

  constructor(private storyService:StoryService, private fb:FormBuilder, private router:Router,
              private elementRef:ElementRef) {
  }

  ngOnInit() {
    this.newStory = !this.story;
    this.DRAFT_KEY = this.story ? `${this.DRAFT_KEY}_${this.story.id}` : this.DRAFT_KEY;

    let title = this.story ? this.story.title : '';
    let content = this.story ? this.story.content : '';
    this.form = this.fb.group({
      title: [title, Validators.required],
      content: [content, Validators.required]
    });
    //apply local changed only after 'updated' date
    let sinceDate = this.story ? this.story.updated : null;
    FormDraft.load(this.DRAFT_KEY, this.form, sinceDate);

    //to preserve this
    this.form.valueChanges.subscribe(values => this.valueChanged(values));
  }

  ngAfterViewInit() {
    this._autosizeUpdate();
  }

  valueChanged(values) {
    FormDraft.save(this.DRAFT_KEY, values);
  }

  onSubmit(event) {
    if (this.form.valid) {
      let data = this.getStoryData();
      this.error = null;
      this.storyService.save(data).subscribe((story) => {
        FormDraft.remove(this.DRAFT_KEY);
        this.router.navigate(['/Story', {slug: story.slug}])
      }, (e) => {
        this.error = e.message;
      })
    } else {
      if (!this.form.controls['title'].valid) {
        this.error = 'Заголовок является обязательным';
        this.elementRef.nativeElement.querySelector('input[name="title"]').focus();
      }
    }
  }

  newImage(image) {
    let control = <Control> this.form.controls['content'];
    let value = control.value;
    if (value.length && value[value.length - 1] !== '\n') {
      value += "\n";
    }
    value += `![](${image.id})`;
    control.updateValue(value, {onlySelf: false, emitEvent: true});
    this._autosizeUpdate();
  }

  getStoryData() {
    let data = this.form.value;
    if (this.story) {
      data.id = this.story.id;
    }
    return data;
  }

  private _autosizeUpdate() {
    let el = this.elementRef.nativeElement.querySelector('textarea');
    el.dispatchEvent(generateEvent('autosize:update', {}));
  }
}
