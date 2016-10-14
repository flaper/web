import {Component} from "@angular/core"
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: "object-search-form",
  styles: [require("./ObjectSearchForm.scss")],
  template: require("./ObjectSearchForm.html")
})

export class ObjectSearchForm {

  constructor(private fb:FormBuilder,
              private router:Router) {

  }
  form:FormGroup;
  ngOnInit() {
    let searchText = "";
    this.form = this.fb.group({
      searchText: [searchText],
    });
  }
  onSubmit(event) {
    let searchText = this.form.controls['searchText'].value.replace('/[^A-Za-zА-Яа-я!@#$,\. 0-9]/ig',"");
    if (searchText.length === 0) return false;
    this.router.navigate(["/o",searchText]);
  }
  handleSearchClick() {
    if (!this.form.controls['searchText'].value) {
      let navbar:any = document.getElementById('mainNavbar');
      navbar.querySelector('input[name="searchText"]').focus();
    }
  }
  handleBlur(){
    if (!this.form.controls['searchText'].value) {
      let navbar = document.getElementById('mainNavbar');
      navbar.classList.remove('search-active');
    }
  }
  handleFocus() {
    let navbar = document.getElementById('mainNavbar');
    navbar.classList.add('search-active');
  }
}
