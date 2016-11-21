import {Component,ElementRef,Input} from "@angular/core"
import {Router,ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationService} from '@flaper/angular';

@Component({
  selector: "object-search-form",
  styles: [require("./ObjectSearchForm.scss")],
  template: require("./ObjectSearchForm.html")
})

export class ObjectSearchForm {
  form:FormGroup;
  @Input()
  buttonMode:boolean = false;
  @Input()
  expand:boolean = false;
  constructor(private fb:FormBuilder,
              private router:Router, private route:ActivatedRoute,
              private el:ElementRef, private _location:LocationService) {

    this.form = this.fb.group({
      searchText: [""],
      domain: [_location.getCurrentDomain()],
      region: [_location.getCurrentRegion()]
    });
  }
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        let text = params["text"] || "";
        this.form.controls['searchText'].setValue(text);
      }
    )
  }
  onSubmit(event) {
    let searchText = this.form.controls['searchText'].value.replace('/[^A-Za-zА-Яа-я!@#$,\. 0-9]/ig',"");
    this._location.setCurrentRegion(this.form.controls['region'].value);
    this._location.setCurrentDomain(this.form.controls['domain'].value);
    this.router.navigate(["/o",searchText]);
  }
}
