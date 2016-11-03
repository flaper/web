import {Component,Input} from "@angular/core";

@Component({
  selector: "question-item",
  styles: [require("./QuestionItem.scss")],
  template: require("./QuestionItem.html")
})

export class QuestionItem {
  @Input()
  question;
  myAnswer = null;
  constructor() {

  }
  iHadAnswered() {
    return this.myAnswer !== null;
  }
  vote(answer) {
    let index = this.question.answers.indexOf(answer);
    this.question.answers[index].count++;
    this.myAnswer = index;
  }
}
