import {Component} from "@angular/core";
import {VoteService, PollService} from "@flaper/angular";
@Component({
  selector: "poll-list",
  styles: [require("./PollList.scss")],
  template: require("./PollList.html")
})

export class PollList {
  records:any[] = [];
  order:string = "created DESC";
  where:any = {status:"active"};
  constructor(private _vote:VoteService, private _poll:PollService) {
    let filter = {where:this.where, order:this.order};
    _poll.get(filter).subscribe(data => {
      this.records = data
    });
  }
  switchOrder(field) {
    let params = this.order.split(" ");
    if (field === params[0]) {
      params[1] = params[1] === "DESC" ? "ASC" : "DESC";
    }
    else {
      params[0] = field;
    }
    this.order = params.join(" ");
  }
}
