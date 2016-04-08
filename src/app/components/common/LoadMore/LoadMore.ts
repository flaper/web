import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

declare var $:any;

const INTERVAL = 300;
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

  private scrollCallback = () => this.checkVisibility();
  private timeoutCallbackId = null;

  private $elem;
  private $window;

  ngOnInit() {
    $(window).scroll(this.scrollCallback);
    let elem = this.elementRef.nativeElement;
    this.$elem = $(elem);
    let win:any = window;
    this.$window = $(win);
  }

  ngOnDestroy() {
    $(window).off('scroll', this.scrollCallback);
    if (this.timeoutCallbackId) {
      clearTimeout(this.timeoutCallbackId);
      this.timeoutCallbackId = null;
    }
  }

  load() {
    if (!this.loading) {
      this.loading = true;
      this.loadMore.emit(true);
    }
  }

  lastCheck = 0;

  checkVisibility(skipTimeCheck = false) {
    if (this.loading) {
      return;
    }

    if (!skipTimeCheck && ((new Date).getTime() - this.lastCheck < INTERVAL)) {
      //if this.loading or less than INTERVAL ms has passed
      //ensure last call if no scroll will be after
      this.scheduleTimeout();
      return;
    }
    if (this.timeoutCallbackId) {
      clearTimeout(this.timeoutCallbackId);
      this.timeoutCallbackId = null;
    }
    this.lastCheck = new Date().getTime();

    let $window = this.$window;
    let docViewTop = $window.scrollTop();
    let docViewBottom = docViewTop + $window.height();

    let elemTop = this.$elem.offset().top;

    if (docViewBottom >= elemTop - 100) {
      this.load();
    }
  }

  scheduleTimeout() {
    if (!this.timeoutCallbackId) {
      this.timeoutCallbackId = setTimeout(() => {
        this.timeoutCallbackId = null;
        this.checkVisibility(true);
      }, INTERVAL);
    }
  }
}
