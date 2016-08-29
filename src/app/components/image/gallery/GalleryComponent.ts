import {Component,Input,Output,EventEmitter,HostListener} from '@angular/core';


@Component({
  selector: 'image-gallery',
  inputs: ['state','images'],
  template: require('./GalleryComponent.html'),
  styles: [require('./GalleryComponent.scss')]
})
export class GalleryComponent {
  _images:Array<number>;
  currentIndex:number;
  size:number;

  @HostListener('window:keydown', ['$event'])
    processHotkeys(e) {
      console.log(e);
      switch (e.key) {
        case 'Escape' :
            this.currentImage = null;
            break;
        case 'ArrowRight' :
            this.next();
            break;
        case 'ArrowLeft' :
            this.previous();
            break;
        default :
            break;
      }
    }
  @Input('images')
    set images(images: number[]) {
      this._images = images;
      this.size = this._images.length;
    }
  @Input('currentImage') currentImage:number;
  @Output() stateUpdated = new EventEmitter();

  previous() {
    this.currentIndex = (this.currentIndex === 0 ? this.size-1 : this.currentIndex-1);
    this.currentImage = this._images[this.currentIndex];
  }
  next() {
    this.currentIndex = (this.currentIndex === this.size-1 ? 0 : this.currentIndex+1);
    this.currentImage = this._images[this.currentIndex];
  }
  setCurrent(id) {
    if (id === null) {
      this.currentImage = null;
      return;
    }
    else {
      let foundIndex = this._images.indexOf(id);
      this.currentIndex = ( foundIndex >= 0 ? foundIndex : 0 );
      this.currentImage = this._images[this.currentIndex];
    }
  }

  close() {
    this.currentImage = null;
    this.stateUpdated.emit(this.currentImage);
  }

  isVisible() {
    return this.currentImage !== null;
  }

  ngOnChanges(changes) {
    if (changes.currentImage) {
      this.setCurrent(changes.currentImage.currentValue);
    }
  }
  constructor() {
  }
}
