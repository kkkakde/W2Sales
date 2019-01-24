import { Component, OnInit } from '@angular/core';
import { visit } from '../_services';
@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  page: number ;
  filter: any;
  totalRec: number;
  public list: any;
  public session: any;
  key: string = 'name'; // set default
  reverse:boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  };
  constructor(private visitservice: visit) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.visitsList();
  }
  visitsList() {
    var body={
      Created_By: this.session.session.PK_Resource_Id

    };
    this.visitservice.visitsList(body)
      .subscribe(data => {
        this.list = data;
        //alert(JSON.stringify(this.list));
      });
  }

  DeleteVisits(item) {
    this.visitservice.DeleteVisits(item.PK_Visit)
      .subscribe(data => {
        alert("Delete visit");
        this.visitsList();
      });
  }
}
