import {Component, Input, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Story, StoryService,FObject} from "@flaper/angular";
import {FormDraft} from "../../../../services/draft/FormDraft";
import {DropzoneComponent} from "../../../image/dropzone/DropzoneComponent";
import {generateEvent} from "../../../../libs/common/common";
import {RatingBar} from "../../../common/Rating/RatingBar/RatingBar";
import {Sanitize} from "@flaper/markdown";

@Component({
  selector: 'simple-write',
  entryComponents: [DropzoneComponent, RatingBar],
  styles: [require('./SimpleWrite.scss')],
  template: require('./SimpleWrite.html')
})
export class SimpleWrite {
  DRAFT_KEY = 'WRITE_STORY';

  @Input()
  story:Story;
  @Input('type')
  type:string;
  @Input('object')
  object:FObject;
  newStory:boolean;
  rating:number = 1;
  isReview:boolean;
  submitInProgress:boolean = false;
  form:FormGroup;
  error:string;
  contentLength:number;
  preview:boolean = false;
  renderer:any = null;
  storyLink:any[] = [];
  constructor(private _story:StoryService, private fb:FormBuilder, private router:Router,
              private elementRef:ElementRef, private _location:Location) {
  }

  ngOnInit() {
    this.newStory = !this.story;
    this.DRAFT_KEY = this.story ? `${this.DRAFT_KEY}_${this.story.id}` : this.DRAFT_KEY;
    let title = this.story ? this.story.title : '';
    let content = this.story ? this.story.content : '';
    if (this.story) {
      this._story.getBaseLink(this.story).subscribe(link => this.storyLink = link );
    }
    this.form = this.fb.group({
      title: [title],
      content: [content, Validators.required]
    });
    //apply local changed only after 'updated' date
    let sinceDate = this.story ? this.story.updated : null;
    FormDraft.load(this.DRAFT_KEY, this.form, sinceDate);

    //to preserve this
    this.form.valueChanges.subscribe(values => this.valueChanged(values));
  }

  ngAfterContentInit() {
    this.contentLength = Sanitize.symbolsNumber(this.form.controls['content'].value);
    this._autosizeUpdate();
  }

  valueChanged(values) {
    this.contentLength = Sanitize.symbolsNumber(this.form.controls['content'].value)
    FormDraft.save(this.DRAFT_KEY, values);
  }

  togglePreview() {
    if (!this.renderer) {
      let Markdown = require('@flaper/markdown').FlaperMark;
      this.renderer = Markdown;
    }
    this.preview = !this.preview;
  }
  getPreviewText() {
    if (!this.renderer) return '';
    return this.renderer.toHTML(this.form.controls['content'].value);
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
        if (this.storyLink && this.storyLink.length > 0) {
          this.router.navigate(this.storyLink);
          this.submitInProgress = false;
        }
        else {
          this._story.getBaseLink(story).subscribe(link => {
            this.router.navigate(link)
            this.submitInProgress = false;
          });
        }
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

  ratingChanged(event) {
    this.rating = event;
    if (this.story) {
      this.story.rating = this.rating;
    }
  }

  ngOnChanges(changes) {
    if (changes.type) {
      this.type = changes.type.currentValue;
    }
    this.isReview = (this.type === 'review');
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
    if (this.isReview) {
      data.rating = this.rating;
    }
    if (this.object) {
      data.objectId = this.object.id;
    }
    if (this.story) {
      data.id = this.story.id;
    }
    data.type = this.type;
    return data;
  }

  private _autosizeUpdate() {
    let el = this.elementRef.nativeElement.querySelector('textarea');
    el.dispatchEvent(generateEvent('autosize:update', {}));
  }

  onCancel() {
    if (this.story) {
      // this.router.navigate(['/s', this.story.slug]);
      this.router.navigate(this.storyLink);
    } else {
      this._location.back();
    }
  }
}
