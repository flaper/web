import {Component} from 'angular2/core';
import {RouteConfig, Location} from 'angular2/router';
import {Http} from 'angular2/http';
import {PageService} from "./services/helpers/PageService";
import {UserService} from "./services/UserService";

import {MenuLeft} from "./layout/MenuLeft/MenuLeft";
import {Navbar} from './components/layout/navbar/navbar';
import {Footer} from "./components/layout/footer/footer";

import {ROUTES} from './routes';

@Component({
  selector: 'app',
  directives: [Navbar, Footer, MenuLeft],
  template: require('./app.html')
})
@RouteConfig(ROUTES)
export class App {
  constructor(pageService:PageService, location:Location, private userService:UserService) {
    let path = location.path();
    if (!path || path === '/') {
      pageService.navigateToDefault();
    }
  }
}
