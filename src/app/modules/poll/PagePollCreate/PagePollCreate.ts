import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators,FormArray} from '@angular/forms';
import {PollService} from "@flaper/angular";
import {Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: "page-poll-create",
  styles: [require("./PagePollCreate.scss")],
  template: require("./PagePollCreate.html")
})

export class PagePollCreate {
  form:FormGroup;
  type:string="poll";
  error:string=null;
  answers:string[] = [""];
  constructor(private fb: FormBuilder, private _poll:PollService, private router:Router) {
    let defaultDate = moment().format('YYYY-MM-DD');
    this.form = fb.group({
      title: ['',Validators.required],
      openDate:[defaultDate, Validators.required],
      closeDate:[defaultDate, Validators.required],
      description:[""],
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
  setType(type:string):void{
    this.type=type;
  }

  getTitleLength():number {
    return this.form.controls['title'].value.replace(' ',"").length;
  }
  titleValid() {
    return (this.getTitleLength()) >= 128;
  }
  onSubmit(event) {
    let poll = this.getPollData();
    this._poll.createPoll(poll)
    .subscribe(
      data => this.router.navigate(['/p','polls']),
      err => this.error = err.message
    )
  }
  getPollData() {
    let title = this.form.controls['title'].value.trim(),
        openDate = this.form.controls['openDate'].value,
        closeDate = this.form.controls['closeDate'].value,
        type = this.type,
        answers = [];
        switch (type) {
          case "poll" :
            answers = this.form.controls['answers'].value.map(value => value.answer).filter(value => !!value);
            break;
          case "proposal" :
            answers =  ['Поддержать'].filter(value => !!value);
            break;
          case "voting" :
          default:
            answers = [];
            break;
        }
    let poll = {title,answers,type,openDate,closeDate};
    if (type==='proposal') poll.description = this.form.controls['description'].value;
    return poll;
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
