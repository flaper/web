import {Component, Input,Output,EventEmitter} from "@angular/core";

@Component({
  selector:"order-switch",
  styles: [require('./OrderSwitch.scss')],
  template: require('./OrderSwitch.html')
})

export class OrderSwitch {
  @Input()
  fields:any[] = [];
  @Output()
  orderChanged = new EventEmitter();
  sortField:string="";
  sortDirection:string="DESC";
  constructor() {

  }
  sort(field:any) {
    if (field.name === this.sortField)
      this.toggleSortDirection();
    else  {
      this.sortField = field.name;
      this.sortDirection = 'DESC';
    }
    this.orderChanged.emit(`${this.sortField} ${this.sortDirection}`)
  }
  sortedBy(direction:string) {
    return this.sortDirection === direction;
  }
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'DESC' ? 'ASC' : 'DESC';
  }
}
