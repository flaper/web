import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {removeNgStyles} from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';

// our list of app modules
import {SharedModule} from "./shared/shared.module";
import {UserModule} from "./modules/user";
import {SupportModule} from "./modules/support";

// App is our top level component
import {AppComponent} from './app.component';
import {APP_RESOLVER_PROVIDERS} from './app.resolver';
import {MenuLeft} from "./components/layout/MenuLeft/MenuLeft";
import {Footer} from "./components/layout/footer/footer";
import {Navbar} from "./components/layout/navbar/navbar";
import {Curtain} from "./components/layout/Curtain/Curtain";
import {PageNavigator} from "./components/layout/PageNavigator/PageNavigator";
import {PageUsers} from "./components/pages/user/PageUsers/PageUsers";
import {PageUserMenu} from "./components/pages/user/PageUserMenu/PageUserMenu";
import {Github} from "./components/layout/navbar/github/github";
import {PageLastStories} from "./components/pages/home/PageLastStories/PageLastStories";
import {LayoutHome} from "./components/pages/home/LayoutHome/LayoutHome";
import {LayoutObject} from "./components/pages/object/LayoutObject/LayoutObject";
import {ObjectSearch} from "./components/pages/object/ObjectSearch/ObjectSearch";
import {LastStories} from "./components/pages/home/PageLastStories/Content/LastStories";
import {TopStories} from "./components/pages/home/PageTopStories/Content/TopStories";
import {PageTopStories} from "./components/pages/home/PageTopStories/PageTopStories";
import {PageTopStoriesLast} from "./components/pages/home/PageTopStoriesLast/PageTopStoriesLast";
import {News} from "./components/pages/home/PageNews/Content/News";
import {HomeLinks} from "./components/pages/home/LayoutHome/widgets/HomeLinks/HomeLinks";
import {SimpleWrite} from "./components/story/write/SimpleWrite/SimpleWrite";
import {WriteStoryButton} from "./components/story/write/WriteStoryButton/WriteStoryButton";
import {PageManageRequest} from "./components/pages/object/PageManageRequest/PageManageRequest";
import {PageManage} from "./components/pages/object/PageManage/PageManage";
import {ObjectList} from "./components/object/ObjectList/ObjectList";
import {ObjectSearchForm} from "./components/object/ObjectSearchForm/ObjectSearchForm";
import {DropzoneComponent} from "./components/image/dropzone/DropzoneComponent";
import {PageLogin} from "./components/pages/login/PageLogin";
import {PageLoginEmail} from "./components/pages/login/PageLoginEmail/PageLoginEmail";
import {PageNews} from "./components/pages/home/PageNews/PageNews";
import {PageQuestion} from "./components/pages/question/read/PageQuestion";
import {PageWriteStory} from "./components/pages/story/write/PageWriteStory";
import {PageStory} from "./components/pages/story/read/PageStory";
import {TagStoryPage} from "./components/pages/story/tags/TagStoryPage";
import {PageStoryChanges} from "./components/pages/story/changes/PageStoryChanges";
import {PageFlapSync} from "./components/pages/flap/PageFlapSync/PageFlapSync";
import {UserSearch} from "./components/user/UserSearch/UserSearch";
import {UserList} from "./components/user/UserList/UserList";
import {PageObjectMain} from "./components/pages/object/PageObjectMain/PageObjectMain";
import {PageReview} from "./components/pages/object/PageReview/PageReview";
import {PageNotFound} from "./components/pages/notFound/PageNotFound";
import {PageObjectEdit} from "./components/pages/object/PageObjectEdit/PageObjectEdit";
import {PageSearchEngineHide} from "./components/pages/object/PageSearchEngineHide/PageSearchEngineHide";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstrapping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, MenuLeft, Footer, Navbar, Curtain, PageUsers, PageUserMenu, News, HomeLinks,
    Github, PageLastStories, LayoutHome, LayoutObject, ObjectSearch, ObjectSearchForm, LastStories, TopStories,
    PageTopStories, PageTopStoriesLast, ObjectList, SimpleWrite, WriteStoryButton, PageManageRequest, PageManage,
    PageSearchEngineHide, DropzoneComponent, PageLogin,PageLoginEmail, PageNews, PageWriteStory, PageObjectEdit,
    PageNavigator, PageStory, PageStoryChanges, PageFlapSync, PageObjectMain, PageReview, UserSearch, UserList,
    PageNotFound, TagStoryPage,PageQuestion
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: false}),
    // our modules
    SharedModule, UserModule, SupportModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }

  hmrOnInit() {
    this.appRef.tick();
  }

  hmrOnDestroy() {
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy() {
  }
}
