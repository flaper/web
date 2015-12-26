/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input, ElementRef} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
import {Comment} from "../../../models/common/Comment";
import {CommentService} from "../../../services/CommentService";
import {FormDraft} from "../../../services/draft/FormDraft";
import {Autosize} from "../../../directives/Autosize/Autosize";
import {generateEvent} from "../../../libs/common/common";

@Component({
  selector: 'comment-write',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, Autosize],
  styles: [require('./CommentWrite.scss')],
  template: require('./CommentWrite.html')
})
export class CommentWrite {
  DRAFT_KEY = 'WRITE_COMMENT';

  //for existed comment
  @Input()
  comment:Comment;

  //for new comment
  @Input()
  subjectId:string;

  newComment:boolean;
  disabled:boolean = false;

  form:ControlGroup;

  constructor(private commentService:CommentService, private fb:FormBuilder, private elementRef:ElementRef) {
  }

  ngOnInit() {
    this.newComment = !this.comment;
    this.DRAFT_KEY = this.newComment ? `${this.DRAFT_KEY}_${this.subjectId}` : `${this.DRAFT_KEY}_${this.comment.id}`;
    this.subjectId = this.newComment ? this.subjectId : this.comment.subjectId;

    let content = this.comment ? this.comment.content : '';
    this.form = this.fb.group({
      content: [content, Validators.required]
    });
    //apply local changed only after 'updated' date
    let sinceDate = this.comment ? this.comment.updated : null;
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
      let data = this.getCommentData();
      this.disabled = true;
      this.commentService.save(data).subscribe((comment) => {
        this.clearForm();
        this.disabled = false;
        //this.router.navigate(['/Story', {slug: story.slug}])
      }, (e) => {
        this.disabled = false;
      })
    }
  }

  clearForm() {
    FormDraft.remove(this.DRAFT_KEY);
    this.form = this.fb.group({
      content: ['', Validators.required]
    });
  }

  getCommentData() {
    let data = this.form.value;
    data.subjectId = this.subjectId;
    if (this.comment) {
      data.id = this.comment.id;
    }
    console.log('data', data);
    return data;
  }

  private _autosizeUpdate() {
    let el = this.elementRef.nativeElement.querySelector('textarea');
    el.dispatchEvent(generateEvent('autosize:update', {}));
  }
}
