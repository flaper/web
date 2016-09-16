import {Component,ElementRef,Input} from '@angular/core';


@Component({
  selector: 'curtain',
  styles: [require('./Curtain.scss')],
  template: require('./Curtain.html')
})
export class Curtain {
  @Input() state:boolean;
  constructor(private el:ElementRef) {
  }
  
  ngOnChanges(changes) {
    if (changes.state !== undefined) {
      this.el.nativeElement.style.opacity = changes.state ? 0 : 1;
    }
  }
}
