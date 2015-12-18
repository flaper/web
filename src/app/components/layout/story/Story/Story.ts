/// <reference path="../../../../../../typings/main.d.ts" />

import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Story} from "../../../../models/common/Story";

@Component({
  selector: 'story',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [],
  styles: [require('./Story.scss')],
  template: require('./Story.html')
})
export class StoryComponent {
  @Input()
  story:Story;

  constructor() {
  }
}
