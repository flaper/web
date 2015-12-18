import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {UserService} from "../../../../services/UserService";

@Component({
  selector: 'page-create-story',
  directives: [FORM_DIRECTIVES],
  pipes: [],
  styles: [require('./create.scss')],
  template: require('./create.html')
})
export class PageCreateStory {
  constructor(private userService:UserService) {
  }
}
