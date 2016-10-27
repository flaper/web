import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'rating',
  styles: [require('./RatingBar.scss')],
  template : require('./RatingBar.html')
})


export class RatingBar {
  @Input() numeric:boolean;
  @Input() display:boolean;
  @Input() rating:number;
  @Output() changed = new EventEmitter();
  constructor() {
    this.rating = 0;
  }
  ratings:number[] = [1,2,3,4,5,6,7,8,9,10].reverse();
  isActive(val:number):boolean {
    return this.rating === val;
  }
  setRating(val:number):void {
    if (this.display) return;
    this.rating = val;
    this.changed.emit(this.rating);
  }
  ngOnChanges(changes) {
    if (changes.rating) {
      this.setRating(parseInt(changes.rating.currentValue));
    }
  }
}
