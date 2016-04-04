/// <reference path="../../typingsOurs/main.d.ts" />

import {Component} from 'angular2/core';
import {RouteConfig, Location} from 'angular2/router';
import {Http} from 'angular2/http';
import {PageService} from "./services/helpers/PageService";

import {Navbar} from './components/layout/navbar/navbar';
import {Footer} from "./components/layout/footer/footer";

import {ROUTES} from './routes';

@Component({
  selector: 'app',
  directives: [Navbar, Footer],
  template: `
    <div class="above-footer">
        <header>
          <navbar></navbar>
        </header>

        <main>
          <router-outlet></router-outlet>
        </main>
    </div>

    <footer>
    </footer>
  `
})
@RouteConfig(ROUTES)
export class App {
  constructor(pageService:PageService, location:Location) {
    let path = location.path();
    if (!path || path === '/') {
      pageService.navigateToDefault();
    }
  }
}
