import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';
import {Story} from "../../../models/common/Story";
import {TimeAgoPipe} from 'angular2-moment';
import {ACL} from "../../../acl/ACL";
import * as moment from 'moment';
import {LikeComponent} from "../../like/LikeComponent/LikeComponent";
import {UserLink} from "../../user/UserLink/UserLink";
import {UserAvatar} from "../../user/UserAvatar/UserAvatar";
import {StoryService} from "../../../services/story/StoryService";
import {PostActions} from "../../post/PostActions/PostActions";
import {ViewService} from "../../../services/ViewService";
import {PageService} from "../../../services/helpers/PageService";
import {StoryBestService} from "../../../services/story/StoryBestService";

@Component({
  selector: 'story',
  directives: [UserLink, UserAvatar, LikeComponent, PostActions],
  pipes: [TimeAgoPipe],
  styles: [require('./StoryComponent.scss')],
  template: require('./StoryComponent.html')
})
export class StoryComponent {
  @Input()
  story:Story;

  private _moment;
  private actions = [
    {name: 'deny', title: 'Отклонить', icon: 'fa-ban', acl: 'Story.deny'},
    {name: 'delete', title: 'Удалить', acl: 'Story.delete'},
    {name: 'best', title: 'Победитель', icon: 'fa-trophy', acl: 'super'},
  ];

  constructor(private acl:ACL, private storyService:StoryService, private viewService:ViewService,
              private pageService:PageService, private router:Router, private storyBestService:StoryBestService) {
    this._moment = moment;
  }

  ngOnInit() {
    this.viewService.post(this.story.id);
  }

  private _yaShare = null;

  ngAfterViewInit() {
    let mobile = window.innerWidth < 500;
    let id = mobile ? 'mobile-story-share' : 'story-share';

    this._yaShare = Ya.share2(id,
      {
        content: {
          url: `http://flaper.org/s/${this.story.slug}`,
          title: this.story.title,
          description: this.story.shortInline
        },
        theme: {
          counter: !mobile
        }
      });
  }

  ngOnDestroy() {
    if (this._yaShare) {
      this._yaShare.destroy();
      this._yaShare = null;
    }
  }

  showChangedTime() {
    let diff = this.story.updated.getTime() - this.story.created.getTime();
    //so at least 3 minutes has passed
    let ifSomeTimePassed = diff / 1000 > 60 * 3;
    let passedFromNow = Math.min((new Date()).getTime() - this.story.created.getTime(), 1);

    //so we e.g. don't care about 1 month if already 2 years passed
    let ifSignificant = diff / passedFromNow > 0.1;

    return ifSignificant && ifSomeTimePassed &&
      this._moment(this.story.created).fromNow() !== this._moment(this.story.updated).fromNow()
  }

  actionEvent(event) {
    switch (event) {
      case 'delete':
        this.storyService.del(this.story.id).subscribe(() => {
          this.pageService.navigateToDefault();
        });
        break;
      case 'deny':
        this.storyService.deny(this.story.id).subscribe(() => {
          this.pageService.navigateToDefault();
        });
        break;
      case 'best':
        let place = window.prompt('Какой место должен занять отзыв?', '');
        if (place) {
          this.storyBestService.post(this.story.id, place).subscribe(() => {
            this.router.navigate(['Top'])
          })
        }
        break;
      default:
        throw `Unsupported event ${event}`;
    }
  }
}
