import {Component, ElementRef, EventEmitter, Output} from '@angular/core';
import {Image, ImageService, JwtToken} from "flaper";
let Dropzone = require('dropzone');

@Component({
  selector: 'dropzone',
  styles: [require('./DropzoneComponent.scss')],
  template: require('./DropzoneComponent.html')
})
export class DropzoneComponent {
  UPLOAD_URL;
  options = {};

  @Output()
  newImage:EventEmitter<Image> = new EventEmitter<Image>();

  dropzone;

  constructor(private elementRef:ElementRef, _image:ImageService) {
    this.UPLOAD_URL = _image.IMAGE_UPLOAD_URL;
    let self = this;
    this.options = {
      dictDefaultMessage: "Загрузить картинки (перетащить или выбрать)",
      init: function () {
        this.on("success", function (file, response) {
          self.newImage.emit(response);
        });
      },
      headers: {
        Authorization: JwtToken.get()
      }
    }
  }

  ngAfterViewInit() {
    let el = this.elementRef.nativeElement.querySelector('.dropzone');
    this.dropzone = new Dropzone(el, this.options);
  }

  ngOnDestroy() {
    this.dropzone.destroy();
  }
}
