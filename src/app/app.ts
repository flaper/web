/// <reference path="../../typingsOurs/main.d.ts" />

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {APP_PROVIDERS} from './services/providers';

import {Navbar} from './components/layout/navbar/navbar';
//pages
import {PageHome} from './components/pages/home/home';
import {PageTopStories} from "./components/pages/home/topStories/topStories";
import {PageLogin} from './components/pages/login/login';
import {PageWriteStory} from './components/pages/story/write/PageWriteStory';
import {PageUser} from './components/pages/user/PageUser';
import {PageStory} from "./components/pages/story/read/PageStory";
import {Footer} from "./components/layout/footer/footer";

@Component({
  selector: 'app',
  providers: [FORM_PROVIDERS, APP_PROVIDERS],
  directives: [ROUTER_DIRECTIVES, Navbar, Footer],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
    <header>
      <navbar></navbar>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
    </footer>
  `
})
@RouteConfig([
  {path: '/', component: PageHome, name: 'Home'},
  {path: '/top', component: PageTopStories, name: 'Top'},
  {path: '/login', component: PageLogin, name: 'Login'},
  {path: '/create_story', component: PageWriteStory, name: 'CreateStory'},
  {path: '/s/:slug', component: PageStory, name: 'Story'},
  {path: '/s/:slug/edit', component: PageWriteStory, name: 'WriteStory'},
  {path: '/@/:id', component: PageUser, name: 'User'},
])
export class App {
  constructor() {
  }
}
