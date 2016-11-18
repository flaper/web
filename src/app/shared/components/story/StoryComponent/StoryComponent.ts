import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ACL, Story, StoryService, StoryBestService, ViewService, UserService} from "@flaper/angular";
import * as moment from 'moment';
import {PageService} from "../../../../services/helpers/PageService";
import {Amalker} from "../../../../services/amalker/Amalker";

@Component({
  selector: 'story',
  styles: [require('./StoryComponent.scss')],
  template: require('./StoryComponent.html')
})
export class StoryComponent {
  @Input()
  story: Story;
  storyLink: any[] = [];
  private _moment;
  private initialized: Boolean = false;
  currentImage: string = null; //current image link / gallery state
  dfp = false;
  DFP_ID1 = 'div-gpt-ad-1479456129763-0';
  private actions = [
    {name: 'deny', title: 'Отклонить', icon: 'fa-ban', acl: 'Story.deny'},
    {name: 'delete', title: 'Удалить', acl: 'Story.delete'},
    {name: 'changes', title: 'История изменений', icon: 'fa-list', acl: 'super'},
    {name: 'best', title: 'Победитель', icon: 'fa-trophy', acl: 'super'},
  ];

  constructor(private acl: ACL, private _story: StoryService, private _view: ViewService, private _page: PageService,
              private router: Router, private _storyBest: StoryBestService, private _user: UserService) {
    this._moment = moment;
  }

  ngOnInit() {
    this._view.post(this.story.id);
    this._story.getBaseLink(this.story).subscribe(link => this.storyLink = link);
    this.dfp = !this._user.currentUser && !this.story.flagCp;
  }

  private _yaShare = null;

  ngAfterViewInit() {
    let mobile = window.innerWidth < 500;
    let id = mobile ? 'mobile-story-share' : 'story-share';
    if (!this.initialized) {
      this.initImageClickEvents();
      this.initialized = true;
    }
    this._yaShare = Ya.share2(id,
      {
        content: {
          url: `http://flaper.org/s/${this.story.slug}`,
          title: this.story.title,
          description: this.story.shortText
        },
        theme: {
          counter: !mobile
        }
      });
    this.showDfp();
  }

  ngOnDestroy() {
    if (this._yaShare) {
      this._yaShare.destroy();
      this._yaShare = null;
    }
  }

  openGallery(index) {
    this.currentImage = this.story.images[index];
  }

  initImageClickEvents() {
    let storyImages = document.getElementsByClassName('contentHTML')[0].getElementsByTagName('img');
    [].forEach.call(storyImages,
      (element) => {
        let id = element.src.replace(/[http].*\/([a-z0-9]{2})\/([a-z0-9]{2})\/([a-z0-9]+)_middle.*/i, '$1$2$3');
        element.style.cursor = "pointer";
        element.onclick = (e) => {
          this.currentImage = id;
        }
      }
    );
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

  //gallery state watcher
  stateChanged(image) {
    this.currentImage = image;
  }

  getEditLink() {
    return this.storyLink.concat("edit");
  }

  actionEvent(event) {
    switch (event) {
      case 'delete':
        this._story.del(this.story.id).subscribe(() => {
          this._page.navigateToDefault();
        });
        break;
      case 'deny':
        this._story.deny(this.story.id).subscribe(() => {
          this._page.navigateToDefault();
        });
        break;
      case 'changes' :
        this.router.navigate(['/p', 'storyChanges', this.story.id]);
        break;
      case 'best':
        let place = window.prompt('Какой место должен занять отзыв?', '');
        if (place) {
          this._storyBest.post(this.story.id, place).subscribe(() => {
            this.router.navigate(['Top'])
          })
        }
        break;
      default:
        throw `Unsupported event ${event}`;
    }
  }


  showDfp() {
    if (this.dfp) {
      Amalker.show({type: '/113097344/flaper_main', id: this.DFP_ID1, size: [336, 280]});
    }
  }
}
