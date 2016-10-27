import {ElementRef, Directive} from '@angular/core';
import * as autosize from 'autosize';

@Directive({
  selector: '[autosize]'
})
export class Autosize {
  constructor(private elementRef:ElementRef) {
  }

  ngOnInit() {
    let el = this.elementRef.nativeElement;
    autosize(el);
    el.classList.add('textarea-autosize');
  }
}
