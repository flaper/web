import {Component,ElementRef} from "@angular/core"
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: "object-search-form",
  styles: [require("./ObjectSearchForm.scss")],
  template: require("./ObjectSearchForm.html")
})

export class ObjectSearchForm {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private router:Router,
              private el:ElementRef) {
                let searchText = "";
                this.form = this.fb.group({
                  searchText: [searchText],
                });
  }
  onSubmit(event) {
    let searchText = this.form.controls['searchText'].value.replace('/[^A-Za-zА-Яа-я!@#$,\. 0-9]/ig',"");
    this.router.navigate(["/o",searchText]);
  }
}
