import {Component, Input, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Story, StoryService} from "@flaper/angular";
import {FormDraft} from "../../../../services/draft/FormDraft";
import {DropzoneComponent} from "../../../image/dropzone/DropzoneComponent";
import {generateEvent} from "../../../../libs/common/common";

@Component({
  selector: 'simple-write',
  entryComponents: [DropzoneComponent],
  styles: [require('./SimpleWrite.scss')],
  template: require('./SimpleWrite.html')
})
export class SimpleWrite {
  DRAFT_KEY = 'WRITE_STORY';

  @Input()
  story:Story;
  newStory:boolean;
  submitInProgress:boolean = false;
  form:FormGroup;
  error:string;

  constructor(private _story:StoryService, private fb:FormBuilder, private router:Router,
              private elementRef:ElementRef, private _location:Location) {
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
    if (this.submitInProgress) {
      return false;
    }
    if (this.form.valid) {
      let data = this.getStoryData();
      this.error = null;
      this.submitInProgress = true;
      this._story.save(data).subscribe((story) => {
        FormDraft.remove(this.DRAFT_KEY);
        this.router.navigate(['/s', story.slug])
        this.submitInProgress = false;
      }, (e) => {
        this.error = e.message;
        this.submitInProgress = false;
      })
    } else {
      if (!this.form.controls['title'].valid) {
        this.error = 'Заголовок является обязательным';
        this.elementRef.nativeElement.querySelector('input[name="title"]').focus();
      }
    }
  }

  newImage(image) {
    let control = <FormControl> this.form.controls['content'];
    let value = control.value;
    if (value.length && value[value.length - 1] !== '\n') {
      value += "\n";
    }
    value += `![](${image.id})`;
    control.setValue(value, {onlySelf: false, emitEvent: true});
    this._autosizeUpdate();
  }

  getStoryData() {
    let data = this.form.value;
    data.type = 'article';
    if (this.story) {
      data.id = this.story.id;
    }
    return data;
  }

  private _autosizeUpdate() {
    let el = this.elementRef.nativeElement.querySelector('textarea');
    el.dispatchEvent(generateEvent('autosize:update', {}));
  }

  onCancel() {
    if (this.story) {
      this.router.navigate(['/s', this.story.slug]);
    } else {
      this._location.back();
    }
  }
}
