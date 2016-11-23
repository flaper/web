import {Component,Input} from "@angular/core";
import {Router} from "@angular/router";
import {VoteService, PollService, UserService,Poll,ACL} from "@flaper/angular";
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
  results:any = {};
  isVoting:boolean = false;
  isPoll:boolean = false;
  private actions = [
    {name: 'deny', title: 'Отклонить', icon: 'fa-ban', acl: 'Poll.deny'},
    {name: 'delete', title: 'Удалить', acl: 'Poll.delete'},
    {name: 'close', title: 'Закрыть', icon: 'fa-close', acl: 'super'}
  ];

  constructor(private _vote:VoteService, private _poll:PollService, private _user:UserService,
              private acl:ACL,private router:Router) {
  }
  ngOnInit() {
    this.isVoting = this.poll.type === 'voting';
    this.isPoll = this.poll.type === 'poll';
    this.now = new Date();
    this._vote.voteExists(this.poll.id)
    .subscribe(
      data => {
        this.iHadVoted = data.voted;
        if (this.iHadVoted) {
          this._vote.getResults(this.poll.id)
          .subscribe(
            results =>  this.results = results
          );
        }
      },
      err => console.error(err)
    )
  }
  vote(answer) {
    this._vote.voteFor(this.poll.id,answer)
    .subscribe(
      data => {
        this.iHadVoted = true;
        this._vote.getResults(this.poll.id)
        .subscribe(
          results => this.results= results
        );
      },
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
    return userRule;
  }
  isCandidate() {
    let pollRule = this.isVoting && (this._user.hasCurrentUser ? this.poll.answers.indexOf(this._user.currentUserId) === -1 : false);
    return pollRule;
  }
  canVote() {
    let userRule = this._user.hasCurrentUser ? this.poll.type === 'proposal' ? this._user.currentUser.level >= 2 : this._user.currentUser.storiesNumber >=5 : false;
    return userRule;
  }
  addMeAsCandidate() {
    if (!this._user.hasCurrentUser) return false;
    this._poll.addToCandidates(this.poll.id)
    .subscribe(
      data => {
        this.poll.answers.push(this._user.currentUserId);
      },
      err => console.error(err)
    );
  }

  actionEvent(event) {
    switch (event) {
      case 'delete':
        this._poll.deletePoll(this.poll.id).subscribe(() => {
          this.poll = null;
          this.router.navigate(['/p','polls']);
        });
        break;
      case 'deny':
        this._poll.denyPoll(this.poll.id).subscribe(() => {
          this.poll = null;
          this.router.navigate(['/p','polls']);
        });
        break;
      case 'close' :
        this._poll.closePoll(this.poll.id).subscribe(() => {
          this.poll = null;
          this.router.navigate(['/p','polls']);
        });
        break;
      default:
        throw `Unsupported event ${event}`;
    }
  }
}
