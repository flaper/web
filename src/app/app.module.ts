import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {removeNgStyles} from '@angularclass/hmr';
import {SharedModule} from "./shared/shared.module";
import {UserModule} from "./modules/user";

/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';

// App is our top level component
import {App} from './app.component';
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
import {StoriesAutoList} from "./components/story/StoriesAutoList/StoriesAutoList";
import {HomeLinks} from "./components/pages/home/LayoutHome/widgets/HomeLinks/HomeLinks";
import {StoriesList} from "./components/story/StoriesList/StoriesList";
import {SimpleWrite} from "./components/story/write/SimpleWrite/SimpleWrite";
import {WriteStoryButton} from "./components/story/write/WriteStoryButton/WriteStoryButton";
import {PageManageSupport} from "./components/pages/support/PageManageSupport/PageManageSupport";
import {PageManageRequest} from "./components/pages/object/PageManageRequest/PageManageRequest";
import {PageManage} from "./components/pages/object/PageManage/PageManage";
import {LoadMore} from "./components/common/LoadMore/LoadMore";
import {StoryItem} from "./components/story/StoryItem/StoryItem";
import {SubscriptionAutoList} from "./components/subscription/SubscriptionAutoList/SubscriptionAutoList";
import {SubscriptionList} from "./components/subscription/SubscriptionList/SubscriptionList";
import {SubscriptionItem} from "./components/subscription/SubscriptionItem/SubscriptionItem";
import {CommentsShortList} from "./components/comment/CommentsShortList/CommentsShortList";
import {CommentsAutoList} from "./components/comment/CommentsAutoList/CommentsAutoList";
import {CommentsList} from "./components/comment/CommentsList/CommentsList";
import {CommentComponent} from "./components/comment/CommentComponent/CommentComponent";
import {ObjectList} from "./components/object/ObjectList/ObjectList";
import {ObjectSearchForm} from "./components/object/ObjectSearchForm/ObjectSearchForm";
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
import {TagStoryPage} from "./components/pages/story/tags/TagStoryPage";
import {PageStoryChanges} from "./components/pages/story/changes/PageStoryChanges";
import {StoryComponent} from "./components/story/StoryComponent/StoryComponent";
import {GalleryComponent} from "./components/image/gallery/GalleryComponent/GalleryComponent";
import {PageFlapSync} from "./components/pages/flap/PageFlapSync/PageFlapSync";
import {UserSearch} from "./components/user/UserSearch/UserSearch";
import {UserList} from "./components/user/UserList/UserList";
import {PageObjectMain} from "./components/pages/object/PageObjectMain/PageObjectMain";
import {PageReview} from "./components/pages/object/PageReview/PageReview";
import {PageNotFound} from "./components/pages/notFound/PageNotFound";

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
    App, MenuLeft, Footer, Navbar, Curtain, PageUsers, PageUserMenu, News, StoriesAutoList, HomeLinks,
    Github, PageLastStories, LayoutHome, LayoutObject, ObjectSearch, ObjectSearchForm, LastStories, TopStories, PageTopStories, PageTopStoriesLast, ObjectList,
    StoriesList, SimpleWrite, WriteStoryButton, PageManageSupport, PageManageRequest, PageManage, LoadMore, StoryItem,
    CommentsShortList, CommentsAutoList, CommentsList, CommentComponent, SubscriptionList, SubscriptionItem, SubscriptionAutoList, RatingBar, DropzoneComponent, PremiumMessages,
    CommentWrite, PostActions, PageLogin, PageNews, PageWriteStory, PagePremiumSupport, PageNavigator, PageStory, PageStoryChanges, StoryComponent,
    GalleryComponent, PageFlapSync, PageObjectMain, PageReview, UserSearch, UserList,
    PageNotFound, TagStoryPage
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: false}),
    // our modules
    SharedModule, UserModule
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
