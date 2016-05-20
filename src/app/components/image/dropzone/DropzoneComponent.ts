/// <reference path="../../../../../typingsOurs/main.d.ts" />

import {Component, ElementRef, EventEmitter, Output} from '@angular/core';
import {IMAGE_UPLOAD_URL} from "../../../services/ImageService";
import {AuthService} from "../../../services/AuthService";
import {JwtToken} from "../../../services/JwtToken";
import {Image} from "../../../models/common/Image";
let Dropzone = require('dropzone');

@Component({
  selector: 'dropzone',
  styles: [require('./DropzoneComponent.scss')],
  template: require('./DropzoneComponent.html')
})
export class DropzoneComponent {
  UPLOAD_URL = IMAGE_UPLOAD_URL;
  options = {};

  @Output()
  newImage:EventEmitter<Image> = new EventEmitter<Image>();

  dropzone;

  constructor(private elementRef:ElementRef) {
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
