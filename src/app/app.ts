import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {APP_PROVIDERS} from './services/providers';

import {Navbar} from './components/layout/navbar/navbar';
//pages
import {PageHome} from './components/pages/home/home';
import {PageLogin} from './components/pages/login/login';
import {PageCreateStory} from './components/pages/story/create/create';
import {PageStory} from './components/pages/story/story/PageStory';
import {PageUser} from './components/pages/user/PageUser';

@Component({
  selector: 'app',
  providers: [FORM_PROVIDERS, APP_PROVIDERS],
  directives: [ROUTER_DIRECTIVES, Navbar],
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
  {path: '/login', component: PageLogin, name: 'Login'},
  {path: '/create_story', component: PageCreateStory, name: 'CreateStory'},
  {path: '/s/:slug', component: PageStory, name: 'Story'},
  {path: '/@/:id', component: PageUser, name: 'User'},
])
export class App {
  constructor() {
  }
}
