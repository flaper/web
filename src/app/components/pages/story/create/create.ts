import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {UserService} from "../../../../services/UserService";
import {SimpleCreate} from "../../../story/create/SimpleCreate/SimpleCreate";

@Component({
  selector: 'page-create-story',
  directives: [FORM_DIRECTIVES, SimpleCreate],
  pipes: [],
  styles: [require('./create.scss')],
  template: require('./create.html')
})
export class PageCreateStory {
  constructor(private userService:UserService, router:Router) {
    if (!userService.currentUser) {
      router.navigate(['/Login']);
    }
  }
}
