import {PageLogin} from './components/pages/login/PageLogin';
import {PageWriteStory} from './components/pages/story/write/PageWriteStory';
import {PageLastStories} from "./components/pages/home/PageLastStories/PageLastStories";
import {PageNews} from "./components/pages/home/PageNews/PageNews";
import {PageTopStories} from "./components/pages/home/PageTopStories/PageTopStories";
import {PageTopStoriesLast} from "./components/pages/home/PageTopStoriesLast/PageTopStoriesLast";
import {PageStory} from "./components/pages/story/read/PageStory";
import {TagStoryPage} from "./components/pages/story/tags/TagStoryPage";
import {PageStoryChanges} from "./components/pages/story/changes/PageStoryChanges";
import {PageNotFound} from "./components/pages/notFound/PageNotFound";
import {PageUser} from './components/pages/user/PageUser/PageUser';
import {PageUserMenu} from './components/pages/user/PageUserMenu/PageUserMenu';
import {PageUsers} from './components/pages/user/PageUsers/PageUsers';
import {UserRoutes} from './components/pages/user/PageUser/UserRoutes';
import {PageFlapSync} from "./components/pages/flap/PageFlapSync/PageFlapSync";
import {ObjectRoutes} from "./components/pages/object/LayoutObject/ObjectRoutes";
import {ObjectSearch} from "./components/pages/object/ObjectSearch/ObjectSearch";
import {PagePremiumSupport} from "./components/pages/support/PagePremiumSupport/PagePremiumSupport";
import {PageManageSupport} from "./components/pages/support/PageManageSupport/PageManageSupport";

export const ROUTES = [
  {path: '', component: PageLastStories},
  {path: 'p/last', component: PageLastStories},
  {path: 'p/menu', component: PageUserMenu},
  {path: 'p/login', component: PageLogin},
  {path: 'p/news', component: PageNews},
  {path: 'p/create_story', component: PageWriteStory},
  {path: 'p/top', component: PageTopStories},
  {path: 'p/top_last', component: PageTopStoriesLast},
  {path: 'p/flapers', component: PageUsers},
  {path: 'p/support', component: PagePremiumSupport},
  {path: 'p/manageSupport', component: PageManageSupport},
  {path: 'p/storyChanges/:id', component: PageStoryChanges},
  {path: 'p/storyChanges/:id/:page', component: PageStoryChanges},
  {path: 's/:slug', component: PageStory},
  {path: 't/:tag', component: TagStoryPage},
  {path: 's/:slug/edit', component: PageWriteStory},
  {path: 'o/:text', component: ObjectSearch},
  {path: 'o', component: ObjectSearch},
  {path: 'o/:text/:page', component: ObjectSearch},
  {path: 'p/sync/:id', component: PageFlapSync, name: 'FlapSync'},
  {path: 'p/sync/:id/:action', component: PageFlapSync, name: 'FlapSync'},
  UserRoutes,
  ...ObjectRoutes,
  {path: '**', component: PageNotFound},
  {path: 'not-found', component: PageNotFound},
];
