import {Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Comment, CommentService, UserService, ObjectService} from "@flaper/angular";
import {FormDraft} from "../../../../services/draft/FormDraft";
import {generateEvent} from "../../../../libs/common/common";
import * as Rx from 'rxjs';
//noinspection TypeScriptCheckImport
import {OBJECT_PERMISSIONS} from '@flaper/consts';
@Component({
  selector: 'comment-write',
  styles: [require('./CommentWrite.scss')],
  template: require('./CommentWrite.html')
})
export class CommentWrite {
  DRAFT_KEY = 'WRITE_COMMENT';

  //for existed comment
  @Input()
  comment: Comment;

  //for new comment
  @Input()
  subjectId: string;

  @Input()
  compact: boolean = false;

  @Input()
  commentItObservable: Rx.Observable<boolean>;

  @Output()
  commentChange: EventEmitter<Comment> = new EventEmitter<Comment>();

  @Output()
  updateCanceled: EventEmitter<boolean> = new EventEmitter<boolean>();

  newComment: boolean;
  disabled: boolean = false;
  userPermissions: string[] = [];
  active: boolean = false;
  form: FormGroup;

  constructor(private _comment: CommentService, private fb: FormBuilder,
              private elementRef: ElementRef, private _object: ObjectService, private _user: UserService) {
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

    this._object.getPermissions(this.subjectId)
      .subscribe(permissions => this.userPermissions = permissions);

    //to preserve this
    this.form.valueChanges.subscribe(values => this.valueChanged(values));
    if (!this.newComment) {
      let textField = this.elementRef.nativeElement.querySelector('textarea');
      textField && textField.focus();
    }
    if (this.commentItObservable) {
      //noinspection TypeScriptUnresolvedFunction
      this.commentItObservable.subscribe(() => {
        setTimeout( () => {
          let textField = this.elementRef.nativeElement.querySelector('textarea');
          textField && textField.focus();
        } , 200);
      })
    }
  }

  ngAfterViewInit() {
    this._autosizeUpdate();
  }

  valueChanged(values) {
    FormDraft.save(this.DRAFT_KEY, values);
  }

  onSubmit(event) {
    if (this.disabled) {
      return false;
    }
    if (this.form.valid) {
      let data = this.getCommentData();
      this.disabled = true;
      this._comment.save(data)
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

  _lastOnBlurId = null;

  onBlur() {
    //workaround to make click on button works, as blur happens before click
    this._lastOnBlurId = setTimeout(() => {
      this._lastOnBlurId = null;
      this.active = false
    }, 100);
  }

  isOwner() {
    return this.userPermissions.some(permission => permission === OBJECT_PERMISSIONS.OWNER);
  }

  canAnswerAsOwner() {
    return this.isOwner() && this.userPermissions.some(permission => permission === OBJECT_PERMISSIONS.ANSWER);
  }

  isVisible() {
    return !(this.isOwner() && !this.canAnswerAsOwner());
  }

  onFocus() {
    if (this._lastOnBlurId) {
      clearTimeout(this._lastOnBlurId);
      this._lastOnBlurId = null;
    }
    this.active = true;
  }

  clearForm() {
    let control = <FormControl> this.form.controls['content'];
    control.setValue('', {});
    FormDraft.remove(this.DRAFT_KEY);
    this._autosizeUpdate();
  }

  getCommentData() {
    let data = this.form.value;
    data.subjectId = this.subjectId;
    if (this.comment) {
      data.id = this.comment.id;
    }
    if (this.comment) {
      data.isAnswer = this.canAnswerAsOwner();
    }
    return data;
  }

  private _autosizeUpdate() {
    let el = this.elementRef.nativeElement.querySelector('textarea');
    el.dispatchEvent(generateEvent('autosize:update', {}));
  }
}
