import {Component,Output,EventEmitter} from '@angular/core';
import {UserService,User} from '@flaper/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'user-search',
  styles: [require('./UserSearch.scss')],
  template: require('./UserSearch.html')
})

export class UserSearch {
  form:FormGroup;
  users:User[] = [];
  @Output()
    usersFound = new EventEmitter();
  constructor(private _users:UserService, private fb:FormBuilder) {

  }

  ngOnInit() {
    let searchText = "";
    this.form = this.fb.group({
      searchText: [searchText],
    });
    this.form.controls['searchText'].valueChanges
      .debounceTime(1000)
      .subscribe(newValue => this.onSubmit(null));
  }

  onSubmit(event) {
    let searchText = this.form.controls['searchText'].value,
        sanitizedText = searchText.replace('/[^A-Za-zА-Яа-я!@#$,\. 0-9]/ig',""),
        isId = /[0-9a-f]{24}/.test(searchText);
    if (searchText.length === 0) return false;
    let where = isId ? {id : searchText} : {displayName:{like:sanitizedText}},
        order = "storiesNumber DESC, likesNumber DESC";

    this._users.get({where,order}).subscribe(users => {
      // this.users = users;
      this.usersFound.emit(users);
    })
  }
}
