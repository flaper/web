import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';
import {Location} from '@angular/common';
import {Http} from '@angular/http';
import {PageService} from "./services/helpers/PageService";
import {UserService} from "flaper";

import {MenuLeft} from "./layout/MenuLeft/MenuLeft";
import {Navbar} from './components/layout/navbar/navbar';
import {Footer} from "./components/layout/footer/footer";
import {AppState} from './app.service';
import {Metrika} from "./services/metrics/Metrika";

import {ROUTES} from './routes';

@Component({
  selector: 'app',
  directives: [Navbar, Footer, MenuLeft],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
@RouteConfig(ROUTES)
export class App {
  constructor(public appState:AppState, pageService:PageService, location:Location,
              private userService:UserService, metrika: Metrika /*ensure to create Metrika instance*/) {
    let path = location.path();
    if (!path || path === '/') {
      pageService.navigateToDefault();
    }

  }
}
