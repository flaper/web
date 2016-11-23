import {Component} from "@angular/core";

@Component({
  selector: "page-ideas",
  styles: [require("./PageIdeas.scss")],
  template: require("./PageIdeas.html")
})

export class PageIdeas {
  order:string="likesNumber DESC";
  where:any ={status:'active',type:'proposal'};
  orderFields:any[] = [
    {name:"likesNumber",title:"По количеству голосов"},
    {name:"created",title:"По дате создания"}
  ]
  constructor() {

  }
  onSort(order:string) {
    this.order=order;
    console.log(order);
  }
}
