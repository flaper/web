import {Component,Input} from "@angular/core";
import {VoteService, PollService, UserService} from "@flaper/angular";
@Component({
  selector: "poll-item",
  styles: [require("./PollItem.scss")],
  template: require("./PollItem.html")
})

export class PollItem {
  @Input()
  poll;
  iHadVoted = null;
  constructor(private _vote:VoteService, private _poll:PollService, private _user:UserService) {
  }
  ngOnInit() {
    this._vote.voteExists(this.poll.id)
    .subscribe(
      data => this.iHadVoted = data.voted,
      err => console.log(err)
    )
  }
  isCandidate() {
    return this.poll.answers.indexOf(this._user.currentUserId) !== -1;
  }
  vote(answer) {
    this._vote.voteFof(this.poll.id,answer)
    .subscribe(
      data => this.iHadVoted = true,
      err => console.log(err)
    )
  }
  addMeAsCandidate() {
    this._poll.addToCandidates(this.poll.id)
    .subscribe(
      data => this.poll.answers.push(this._user.currentUserId),
      err => console.log(err)
    )
    ;
  }
}
