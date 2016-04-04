import {PageLogin} from './components/pages/login/login';
import {PageWriteStory} from './components/pages/story/write/PageWriteStory';
import {PageUser} from './components/pages/user/PageUser';
import {PageStory} from "./components/pages/story/read/PageStory";
import {PageLastStories} from "./components/pages/home/PageLastStories/PageLastStories";
import {PageTopStories} from "./components/pages/home/PageTopStories/PageTopStories";
import {PageTopStoriesLast} from "./components/pages/home/PageTopStoriesLast/PageTopStoriesLast";
import {PageNews} from "./components/pages/home/PageNews/PageNews";

export const ROUTES = [
  {path: '/', component: PageLastStories, name: 'Home'},
  {path: '/news', component: PageNews, name: 'News'},
  {path: '/top', component: PageTopStories, name: 'Top'},
  {path: '/top_last', component: PageTopStoriesLast, name: 'TopLast'},
  {path: '/login', component: PageLogin, name: 'Login'},
  {path: '/create_story', component: PageWriteStory, name: 'CreateStory'},
  {path: '/s/:slug', component: PageStory, name: 'Story'},
  {path: '/s/:slug/edit', component: PageWriteStory, name: 'WriteStory'},
  {path: '/@/:id/...', component: PageUser, name: 'User'},
];
