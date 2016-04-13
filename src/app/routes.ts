import {PageLogin} from './components/pages/login/PageLogin';
import {PageWriteStory} from './components/pages/story/write/PageWriteStory';
import {PageUser} from './components/pages/user/PageUser';
import {PageStory} from "./components/pages/story/read/PageStory";
import {PageLastStories} from "./components/pages/home/PageLastStories/PageLastStories";
import {PageTopStories} from "./components/pages/home/PageTopStories/PageTopStories";
import {PageTopStoriesLast} from "./components/pages/home/PageTopStoriesLast/PageTopStoriesLast";
import {PageNews} from "./components/pages/home/PageNews/PageNews";
import {PageFlapSync} from "./components/pages/flap/PageFlapSync/PageFlapSync";

export const ROUTES = [
  {path: '/', component: PageLastStories, name: 'Home'},
  {path: '/p/news', component: PageNews, name: 'News'},
  {path: '/p/top', component: PageTopStories, name: 'Top'},
  {path: '/p/top_last', component: PageTopStoriesLast, name: 'TopLast'},
  {path: '/p/login', component: PageLogin, name: 'Login'},
  {path: '/p/create_story', component: PageWriteStory, name: 'CreateStory'},
  {path: '/s/:slug', component: PageStory, name: 'Story'},
  {path: '/s/:slug/edit', component: PageWriteStory, name: 'WriteStory'},
  {path: '/@/:id/...', component: PageUser, name: 'User'},
  {path: '/p/sync/:id', component: PageFlapSync, name: 'FlapSync'},
  //{path: '/места/:region/:slug', component: }
];
