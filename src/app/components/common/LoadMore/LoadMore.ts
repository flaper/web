import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'load-more',
  styles: [require('./LoadMore.scss')],
  template: require('./LoadMore.html')
})
export class LoadMore {
  @Output()
  loadMore:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  loading;

  load() {
    if (!this.loading) {
      this.loading = true;
      this.loadMore.emit(true);
    }
  }
}
