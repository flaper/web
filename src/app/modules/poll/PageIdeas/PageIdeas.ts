import {Component} from "@angular/core";

@Component({
  selector: "page-ideas",
  styles: [require("./PageIdeas.scss")],
  template: require("./PageIdeas.html")
})

export class PageIdeas {
  order:string="created DESC";
  where:any ={status:'active',type:'proposal'};
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
