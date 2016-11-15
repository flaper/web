import {Component,Input} from "@angular/core";
import {VoteService, PollService, UserService,Poll} from "@flaper/angular";
@Component({
  selector: "poll-item",
  styles: [require("./PollItem.scss")],
  template: require("./PollItem.html")
})

export class PollItem {
  @Input()
  poll:Poll;
  iHadVoted = null;
  now:Date;
  constructor(private _vote:VoteService, private _poll:PollService, private _user:UserService) {
  }
  ngOnInit() {
    this.now = new Date();
    this.poll.openDate = new Date(this.poll.openDate);
    this.poll.closeDate = new Date(this.poll.closeDate);
    this._vote.voteExists(this.poll.id)
    .subscribe(
      data => this.iHadVoted = data.voted,
      err => console.log(err)
    )
  }
  vote(answer) {
    this._vote.voteFor(this.poll.id,answer)
    .subscribe(
      data => this.iHadVoted = true,
      err => console.log(err)
    )
  }
  inProgress() {
    return this.poll.openDate < this.now && this.poll.closeDate > this.now && this.poll.status === 'active';
  }
  hasFinished() {
    return this.poll.closeDate < this.now || this.poll.status === 'closed';
  }
  canBeCandidate() {
    let userRule = this._user.hasCurrentUser ? this._user.currentUser.storiesNumber >= 10 : false;
    let pollRule = this.poll.type==='voting' && (this._user.hasCurrentUser ? this.poll.answers.indexOf(this._user.currentUserId) === -1 : false);
    return userRule && pollRule;
  }
  canVote() {
    let now = new Date();
    return this._user.hasCurrentUser && !this.iHadVoted && this.poll.status === 'active' && now > this.poll.openDate &&  now < this.poll.closeDate;
  }
  addMeAsCandidate() {
    if (!this._user.hasCurrentUser) return false;
    this._poll.addToCandidates(this.poll.id)
    .subscribe(
      data => {
        this.poll.answers.push(this._user.currentUserId);
        console.log(data);
      },
      err => null
    )
    ;
  }
}
