import {Component,ElementRef,Input} from '@angular/core';


@Component({
  selector: 'curtain',
  styles: [require('./Curtain.scss')],
  template: require('./Curtain.html')
})
export class Curtain {
  @Input() state:boolean;
  constructor(private el:ElementRef) {
    this.el.nativeElement.style.opacity = 1;
  }

  ngOnChanges(changes) {
    if (changes.state !== undefined) {
      setTimeout(() => {
        this.el.nativeElement.style.opacity = changes.state ? 0 : 1;
        this.el.nativeElement.style.display = changes.state ? 'none' : 'block';
      },1000);
    }
  }
}
