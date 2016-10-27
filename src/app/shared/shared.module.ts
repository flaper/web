import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, Form, ReactiveFormsModule} from '@angular/forms';
import {ObjectLink, AutoFocusIt, FlapImagePipe} from '@flaper/angular';
import {MomentModule} from 'angular2-moment';
import {RouterModule} from '@angular/router';
import {Autosize} from "./directives/Autosize/Autosize";
import {LikeComponent} from "./components/like/LikeComponent/LikeComponent";
import {LikeListModal} from "./components/like/LikeListModal/LikeListModal";
import {UserLink} from "./components/user/UserLink/UserLink";
import {UserAvatar} from "./components/user/UserAvatar/UserAvatar";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {SubscribeButton} from "./components/subscribe/SubscribeButton/SubscribeButton";
import {FixedPipe} from "./pipes/FixedPipe";
import {CommentWrite} from "./components/comment/CommentWrite/CommentWrite";
import {PostActions} from "./components/post/PostActions/PostActions";
import {CommentComponent} from "./components/comment/CommentComponent/CommentComponent";
import {CommentsList} from "./components/comment/CommentsList/CommentsList";
import {CommentsShortList} from "./components/comment/CommentsShortList/CommentsShortList";
import {CommentsAutoList} from "./components/comment/CommentsAutoList/CommentsAutoList";
import {RatingBar} from "./components/common/Rating/RatingBar/RatingBar";
import {LoadMore} from "./components/common/LoadMore/LoadMore";
import {GalleryComponent} from "./components/image/gallery/GalleryComponent/GalleryComponent";
import {StoryComponent} from "./components/story/StoryComponent/StoryComponent";
import {StoriesAutoList} from "./components/story/StoriesAutoList/StoriesAutoList";
import {StoriesList} from "./components/story/StoriesList/StoriesList";
import {StoryItem} from "./components/story/StoryItem/StoryItem";

// директивые доступные во всех модулях
const DIRECTIVES = [Autosize, AutoFocusIt];
// компоненты доступные во всех модулях
const COMPONENTS = [ObjectLink, LikeComponent, LikeListModal, UserLink, UserAvatar, SubscribeButton, CommentWrite,
  PostActions, CommentComponent, CommentsList, CommentsShortList, CommentsAutoList, RatingBar, LoadMore,
  GalleryComponent, StoryComponent, StoryItem, StoriesList, StoriesAutoList];
// pipe-ы доступные во всех модулях
const PIPES = [FixedPipe, FlapImagePipe];
@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MomentModule,
    ModalModule.withComponents([LikeListModal]), ModalModule.forRoot(), BootstrapModalModule],
  declarations: [...PIPES, ...DIRECTIVES, ...COMPONENTS],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MomentModule, ...PIPES, ...DIRECTIVES, ...COMPONENTS]
})
export class SharedModule {
}

export * from './components/user/UserAvatar/UserAvatar';
