/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
import {Comment} from "../../../models/common/Comment";
import {CommentService} from "../../../services/CommentService";
import {FormDraft} from "../../../services/draft/FormDraft";
import {Autosize} from "../../../directives/Autosize/Autosize";
import {generateEvent} from "../../../libs/common/common";

@Component({
  selector: 'comment-write',
  directives: [Autosize],
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

  @Output()
  commentChange:EventEmitter<Comment> = new EventEmitter<Comment>();

  @Output()
  updateCanceled:EventEmitter<boolean> = new EventEmitter<boolean>();

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
    if (!this.newComment) {
      this.elementRef.nativeElement.querySelector('textarea').focus();
    }
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
      this.commentService.save(data)
        .subscribe((comment) => {
          if (!this.newComment) {
            Object.assign(this.comment, comment);
          }
          this.clearForm();
          this.disabled = false;
          this.commentChange.emit(comment);
        }, (e) => {
          this.disabled = false;
        })
    }
  }

  clearForm() {
    let control = <Control> this.form.controls['content'];
    control.updateValue('', {});
    FormDraft.remove(this.DRAFT_KEY);
  }

  getCommentData() {
    let data = this.form.value;
    data.subjectId = this.subjectId;
    if (this.comment) {
      data.id = this.comment.id;
    }
    return data;
  }

  private _autosizeUpdate() {
    let el = this.elementRef.nativeElement.querySelector('textarea');
    el.dispatchEvent(generateEvent('autosize:update', {}));
  }
}
