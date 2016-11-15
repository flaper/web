import {Component} from "@angular/core";
import {VoteService, PollService} from "@flaper/angular";
@Component({
  selector: "poll-list",
  styles: [require("./PollList.scss")],
  template: require("./PollList.html")
})

export class PollList {
  records:any[] = [];
  constructor(private _vote:VoteService, private _poll:PollService) {
    let where:any = {status:"active"};
    _poll.get(where).subscribe(data => {
      this.records = data
    });
  }

}
