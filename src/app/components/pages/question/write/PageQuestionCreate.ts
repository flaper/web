import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators,FormArray} from '@angular/forms';
import {PollService} from "@flaper/angular";
@Component({
  selector: "page-question-create",
  styles: [require("./PageQuestionCreate.scss")],
  template: require("./PageQuestionCreate.html")
})

export class PageQuestionCreate {
  form:FormGroup;
  answers:string[] = [""];
  constructor(private fb: FormBuilder, private _poll:PollService) {
    this.form = fb.group({
      title: ['',Validators.required],
      answers: fb.array([
        this.initAnswerForm(),
      ])
    });
  }
  initAnswerForm() {
    return this.fb.group({
      answer:['',Validators.required]
    })
  }
  getTitleLength():number {
    return this.form.controls['title'].value.replace(' ',"").length;
  }
  titleValid() {
    return (this.getTitleLength()) >= 128;
  }
  onSubmit(event) {
    let poll = this.getPollData();
    console.log(poll);
    // this._poll.create(poll).subscribe(data => console.log(data));
  }
  getPollData() {
    let title = this.form.controls['title'].value.trim();
    let answers = this.form.controls['answers'].value.map(value => value.answer);
    let type = "poll";
    return {title,answers};
  }
  addAnswer() {
    let control = <FormArray>this.form.controls['answers']
    control.push(this.initAnswerForm());
  }
  removeAnswer(i:number){
    let control = <FormArray>this.form.controls['answers']
    control.removeAt(i);
  }
}
