import {Component} from "@angular/core";
import {VoteService, PollService} from "@flaper/angular";
@Component({
  selector: "question-list",
  styles: [require("./QuestionList.scss")],
  template: require("./QuestionList.html")
})

export class QuestionList {
  records:any[] = [];
  constructor(private _vote:VoteService, private _poll:PollService) {
    let where:any = {status:"active"};
    _poll.get(where).subscribe(data => {
      console.log(data);
      this.records = data
    });
  }

}
