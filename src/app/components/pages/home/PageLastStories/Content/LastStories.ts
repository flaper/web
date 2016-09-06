import {Component} from '@angular/core';
import {StoriesAutoList} from "../../../../story/StoriesAutoList/StoriesAutoList";
import {HomeLinks} from "../../LayoutHome/widgets/HomeLinks/HomeLinks";

@Component({
  selector: 'last-stories',
  entryComponents: [StoriesAutoList, HomeLinks],
  template: require('./LastStories.html'),
  styles: [require('./LastStories.scss')]
})
export class LastStories {
}
