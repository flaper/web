import {Component,Input,Output,EventEmitter,HostListener} from '@angular/core';
import {GalleryImage} from '../GalleryImage/GalleryImage';
import {CommentsAutoList} from "../../../comment/CommentsAutoList/CommentsAutoList";
import {LikeComponent} from "../../../like/LikeComponent/LikeComponent";

@Component({
  selector: 'image-gallery',
  inputs: ['state','images'],
  directives: [CommentsAutoList,LikeComponent],
  template: require('./GalleryComponent.html'),
  styles: [require('./GalleryComponent.scss')]
})
export class GalleryComponent {
  _images:Array<GalleryImage>;
  _currentImage:GalleryImage;
  currentIndex:number;
  size:number;

  @HostListener('window:keydown', ['$event'])
    processHotkeys(e) {
      switch (e.key) {
        case 'Escape' :
            this.close();
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
    set images(images: string[]) {
      this._images = images.map(image => new GalleryImage(image));
      this.size = this._images.length;
    }
  @Input('oldLinks') oldLinks:boolean;
  @Input('currentImage')
    set currentImage(img:string) {
      this.setCurrent(img);
    };
  @Output() stateUpdated = new EventEmitter();

  previous() {
    this.currentIndex = (this.currentIndex === 0 ? this.size-1 : this.currentIndex-1);
    this._currentImage = this._images[this.currentIndex];
  }
  next() {
    this.currentIndex = (this.currentIndex === this.size-1 ? 0 : this.currentIndex+1);
    this._currentImage = this._images[this.currentIndex];
  }
  setCurrent(id) {
    if (id === null) {
      this._currentImage = null;
      this.currentIndex = 0;
      return;
    }
    else {
      let foundImage = this._images.find((el,index,arr) => el.id === id),
          foundIndex = this._images.indexOf(foundImage);
      this.currentIndex = (foundIndex >= 0 ? foundIndex : 0 );
      this._currentImage = this._images[this.currentIndex];
    }
  }

  close() {
    this._currentImage = null;
    this.stateUpdated.emit(this._currentImage);
  }

  isVisible() {
    return this._currentImage !== null;
  }
  constructor() {
  }
}
