import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './routes';
// App is our top level component
import { App } from './app.component';
import {APPLICATION_DIRECTIVES} from './environment/directives';
import {APPLICATION_PIPES} from './environment/pipes';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import {MenuLeft} from "./components/layout/MenuLeft/MenuLeft";
import {Footer} from "./components/layout/footer/footer";
import {Navbar} from "./components/layout/navbar/navbar";
import {ObjectLink, AutoFocusIt} from '@flaper/angular';
import {PageUsers} from "./components/pages/user/PageUsers/PageUsers";
import {PageUser} from "./components/pages/user/PageUser/PageUser";
import {Github} from "./components/layout/navbar/github/github";
import {PageLastStories} from "./components/pages/home/PageLastStories/PageLastStories";
import {LayoutHome} from "./components/pages/home/LayoutHome/LayoutHome";
import {LayoutObject} from "./components/pages/object/LayoutObject/LayoutObject";
import {LastStories} from "./components/pages/home/PageLastStories/Content/LastStories";
import {TopStories} from "./components/pages/home/PageTopStories/Content/TopStories";
import {PageTopStories} from "./components/pages/home/PageTopStories/PageTopStories";
import {PageTopStoriesLast} from "./components/pages/home/PageTopStoriesLast/PageTopStoriesLast";
import {News} from "./components/pages/home/PageNews/Content/News";
import {StoriesAutoList} from "./components/story/StoriesAutoList/StoriesAutoList";
import {HomeLinks} from "./components/pages/home/LayoutHome/widgets/HomeLinks/HomeLinks";
import {StoriesList} from "./components/story/StoriesList/StoriesList";
import {SimpleWrite} from "./components/story/write/SimpleWrite/SimpleWrite";
import {SimpleReviewWrite} from "./components/story/write/SimpleReviewWrite/SimpleWrite";
import {PageManageSupport} from "./components/pages/support/PageManageSupport/PageManageSupport";
import {PageManageRequest} from "./components/pages/object/PageManageRequest/PageManageRequest";
import {PageManage} from "./components/pages/object/PageManage/PageManage";
import {LoadMore} from "./components/common/LoadMore/LoadMore";
import {StoryItem} from "./components/story/StoryItem/StoryItem";
import {CommentsShortList} from "./components/comment/CommentsShortList/CommentsShortList";
import {CommentsAutoList} from "./components/comment/CommentsAutoList/CommentsAutoList";
import {CommentsList} from "./components/comment/CommentsList/CommentsList";
import {CommentComponent} from "./components/comment/CommentComponent/CommentComponent";
import {RatingBar} from "./components/common/Rating/RatingBar/RatingBar";
import {DropzoneComponent} from "./components/image/dropzone/DropzoneComponent";
import {PremiumMessages} from "./components/premiumSupport/PremiumMessages/PremiumMessages";
import {CommentWrite} from "./components/comment/CommentWrite/CommentWrite";
import {PostActions} from "./components/post/PostActions/PostActions";
import {PageLogin} from "./components/pages/login/PageLogin";
import {PageNews} from "./components/pages/home/PageNews/PageNews";
import {PageWriteStory} from "./components/pages/story/write/PageWriteStory";
import {PagePremiumSupport} from "./components/pages/support/PagePremiumSupport/PagePremiumSupport";
import {PageStory} from "./components/pages/story/read/PageStory";
import {StoryComponent} from "./components/story/StoryComponent/StoryComponent";
import {GalleryComponent} from "./components/image/gallery/GalleryComponent/GalleryComponent";
import {PageFlapSync} from "./components/pages/flap/PageFlapSync/PageFlapSync";
import {UserInfo} from "./components/user/UserInfo/UserInfo";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstrapping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    ...APPLICATION_DIRECTIVES, ...APPLICATION_PIPES,
    App, MenuLeft, Footer, Navbar, ObjectLink, PageUsers, PageUser, AutoFocusIt, News, StoriesAutoList, HomeLinks,
    Github, PageLastStories, LayoutHome, LayoutObject, LastStories, TopStories, PageTopStories, PageTopStoriesLast,
    StoriesList, SimpleWrite, SimpleReviewWrite, PageManageSupport, PageManageRequest, PageManage, LoadMore, StoryItem,
    CommentsShortList, CommentsAutoList, CommentsList, CommentComponent, RatingBar, DropzoneComponent, PremiumMessages,
    CommentWrite, PostActions, PageLogin, PageNews, PageWriteStory, PagePremiumSupport, PageStory, StoryComponent,
    GalleryComponent, PageFlapSync, UserInfo
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: false})
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef:ApplicationRef) {
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
