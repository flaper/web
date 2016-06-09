import {Component} from '@angular/core';
import {StoriesAutoList} from "../../../../story/StoriesAutoList/StoriesAutoList";
import {HomeLinks} from "../../LayoutHome/widgets/HomeLinks/HomeLinks";

@Component({
  selector: 'news',
  directives: [StoriesAutoList, HomeLinks],
  template: require('./News.html'),
  styles: [require('./News.scss')]
})
export class News {
}
