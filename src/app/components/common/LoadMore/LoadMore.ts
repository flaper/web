import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

declare var $:any;

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

  constructor(private elementRef:ElementRef) {

  }

  ngOnInit() {
    //noinspection TypeScriptValidateTypes
    $(window).scroll(() => {
      this.checkVisibility();
    });
    //this.restartInview();
  }

  load() {
    if (!this.loading) {
      this.loading = true;
      this.loadMore.emit(true);
    }
  }

  lastCheck = 0;

  checkVisibility() {
    if (this.loading || ((new Date).getTime() - this.lastCheck < 50)) {
      //if this.loading or less than 50 ms has passed
      return;
    }


    this.lastCheck = new Date().getTime();

    let elem = this.elementRef.nativeElement;
    let $elem = $(elem);
    let win:any = window;
    var $window = $(win);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;

    if (docViewBottom >= elemTop - 100) {
      this.load();
    }
  }
}
