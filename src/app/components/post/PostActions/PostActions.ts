/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {Comment} from "../../../models/common/Comment";
import * as tether from 'tether';
import Tether = tether.Tether;

@Component({
  selector: 'post-actions',
  directives: [],
  pipes: [],
  styles: [require('./PostActions.scss')],
  template: require('./PostActions.html')
})
export class PostActions {
  @Input()
  comment:Comment;

  @Output()
  actionClicked:EventEmitter<string> = new EventEmitter<string>();

  tetherObject;

  constructor(private elementRef:ElementRef) {
  }

  ngOnDestroy() {
    if (this.tetherObject) {
      this.hideTether();
    }
  }

  actionEvent(action) {
    if (this.tetherObject) {
      this.hideTether();
    }
    this.actionClicked.emit(action);
  }


  private toggleTether() {
    this.tetherObject ? this.hideTether() : this.showTether();
  }

  private showTether() {
    let root = this.elementRef.nativeElement;
    let target = root.querySelector('.fa');
    let element = root.querySelector('.post-actions-widget');
    this.tetherObject = new Tether({
      element, target,
      attachment: 'top right',
      targetAttachment: 'bottom right',
      offset: '-3px 0px'
    });
  }

  private hideTether() {
    let container = this.elementRef.nativeElement.querySelector('.tether-container');
    let element = this.tetherObject.element;
    //element.setAttribute('class', 'post-actions-widget tether-open');
    element.setAttribute('style', '');
    container.appendChild(element);
    this.tetherObject.destroy();
    this.tetherObject = null;
  }
}
