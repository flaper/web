/// <reference path="../../typingsOurs/main.d.ts" />

import {Component} from 'angular2/core';
import {RouteConfig, Location} from 'angular2/router';
import {Http} from 'angular2/http';

import {Navbar} from './components/layout/navbar/navbar';
import {Footer} from "./components/layout/footer/footer";

//pages
import {PageLogin} from './components/pages/login/login';
import {PageWriteStory} from './components/pages/story/write/PageWriteStory';
import {PageUser} from './components/pages/user/PageUser';
import {PageStory} from "./components/pages/story/read/PageStory";
import {PageLastStories} from "./components/pages/home/PageLastStories/PageLastStories";
import {PageTopStories} from "./components/pages/home/PageTopStories/PageTopStories";
import {PageNews} from "./components/pages/home/PageNews/PageNews";
import {PageService} from "./services/helpers/PageService";

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
@RouteConfig([
  {path: '/', component: PageLastStories, name: 'Home'},
  {path: '/news', component: PageNews, name: 'News'},
  {path: '/top', component: PageTopStories, name: 'Top'},
  {path: '/login', component: PageLogin, name: 'Login'},
  {path: '/create_story', component: PageWriteStory, name: 'CreateStory'},
  {path: '/s/:slug', component: PageStory, name: 'Story'},
  {path: '/s/:slug/edit', component: PageWriteStory, name: 'WriteStory'},
  {path: '/@/:id/...', component: PageUser, name: 'User'},
])
export class App {
  constructor(pageService:PageService, location:Location) {
    let path = location.path();
    if (!path || path === '/') {
      pageService.navigateToDefault();
    }
  }
}
