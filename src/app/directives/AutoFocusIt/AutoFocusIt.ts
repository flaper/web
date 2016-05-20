import {ElementRef, Directive} from '@angular/core';

@Directive({
  selector: '[auto-focus-it]'
})
export class AutoFocusIt {
  constructor(public el:ElementRef) {
  }

  ngOnInit() {
    // autofocus fix for multiple views
    this.el.nativeElement.focus();
  }
}
