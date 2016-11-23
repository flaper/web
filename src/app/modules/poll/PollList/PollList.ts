import {Component,Input} from "@angular/core";
import {VoteService, PollService} from "@flaper/angular";
@Component({
  selector: "poll-list",
  styles: [require("./PollList.scss")],
  template: require("./PollList.html")
})

export class PollList {
  records:any[] = [];
  @Input()
  order:string = "created DESC";
  @Input()
  where:any = {status:"active"};
  constructor(private _vote:VoteService, private _poll:PollService) {
    this.getRecords();
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
  getRecords() {
    let filter = {where:this.where, order:this.order};
    this._poll.get(filter).subscribe(data => {
      this.records = data
    });
  }
  ngOnChanges() {
    this.getRecords();
  }
}
