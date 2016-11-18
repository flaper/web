import {Component} from "@angular/core";

@Component({
  selector: "page-poll",
  styles: [require("./PagePoll.scss")],
  template: require("./PagePoll.html")
})

export class PagePoll {
  order:string="created DESC";

  orderFields:any[] = [
    {name:"lastActive",title:"По дате последней активности"},
    {name:"created",title:"По дате создания"}
  ]
  constructor() {

  }
  onSort(order:string) {
    this.order=order;
    console.log(order);
  }
}
