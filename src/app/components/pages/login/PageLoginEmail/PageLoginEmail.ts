import {Component} from "@angular/core";
import {AuthService} from "@flaper/angular";

@Component({
  selector: "page-login-email",
  template: require("./PageLoginEmail.html"),
  styles:[require("./PageLoginEmail.scss")]
})

export class PageLoginEmail {
  data = {};

  constructor(private auth:AuthService) {
  }

  onSubmit() {
    this.auth.login(this.data);
  }
}
