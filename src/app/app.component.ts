import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {Location} from '@angular/common';
import 'jquery';
import {PageService} from "./services/helpers/PageService";
import {UserService} from "@flaper/angular";
import {Metrika} from "./services/metrics/Metrika";
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {PopupService} from './services/popup/PopupService';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html'),
  styles: [require('./app.style.scss')]
})
export class AppComponent {
  curtain: boolean = true;

  ngAfterContentInit() {
    this.curtain = false;
  }

  constructor(_page: PageService, location: Location,
              private _user: UserService, metrika: Metrika, /*ensure to create Metrika instance*/
              private _popup: PopupService, overlay: Overlay, vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
    _popup.initContainer(modal);
    let path = location.path();
    if (!path || path === '/') {
      _page.navigateToDefault();
    }
    if (window.innerWidth >= 1000) this.initScroller();
  }

  initScroller() {
    require('scrollup/dist/jquery.scrollUp.min');
    $.scrollUp({
      scrollName: 'scrollUp',      // Element ID
      scrollDistance: 300,         // Distance from top/bottom before showing element (px)
      scrollFrom: 'top',           // 'top' or 'bottom'
      scrollSpeed: 300,            // Speed back to top (ms)
      easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
      animation: 'fade',           // Fade, slide, none
      animationSpeed: 200,         // Animation speed (ms)
      scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
      scrollTarget: 0,         // Set a custom target element for scrolling to. Can be element or number
      scrollText: false, // Text for element, can contain HTML
      scrollTitle: false,          // Set a custom <a> title if required.
      scrollImg: false,            // Set true to use image
      activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
      zIndex: 2147483647           // Z-Index for the overlay
    });
  }
}
