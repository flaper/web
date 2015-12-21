import {ElementRef, Directive} from 'angular2/core';

@Directive({
  selector: '[autofocus]'
})
export class Autofocus {
  constructor(public el:ElementRef) {
    // autofocus fix for multiple views
    this.el.nativeElement.focus();
  }
}
