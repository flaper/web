import {Component, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {Http} from '@angular/http';
import {PageService} from "./services/helpers/PageService";
import {UserService} from "@flaper/angular";

import {Scroller} from "./components/layout/Scroller/Scroller";
import {MenuLeft} from "./components/layout/MenuLeft/MenuLeft";
import {Navbar} from './components/layout/navbar/navbar';
import {Footer} from "./components/layout/footer/footer";
import {Metrika} from "./services/metrics/Metrika";


import {ROUTES} from './routes';

@Component({
  selector: 'app',
  entryComponents: [Navbar, Footer, MenuLeft, Scroller],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
export class App {
  constructor(pageService:PageService, location:Location,
              private _user:UserService, metrika:Metrika /*ensure to create Metrika instance*/) {
    let path = location.path();
    if (!path || path === '/') {
      pageService.navigateToDefault();
    }

  }
}
