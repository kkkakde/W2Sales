import { Component, OnInit } from '@angular/core';
import { NPSScores } from '../_services';
@Component({
  selector: 'app-npslost-score',
  templateUrl: './npslost-score.component.html',
  styleUrls: ['./npslost-score.component.css']
})
export class NPSLostScoreComponent implements OnInit {
  page: number ;
  filter: any;
  totalRec: number;
  public Lostlist: any;
  public session: any;
  key: string = 'name'; // set default
  reverse:boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private npsscoreservice: NPSScores) { }

  ngOnInit() {this.session = {
    session: JSON.parse(localStorage.getItem('currentUser'))
    };
  let body = {
    Created_By: this.session.session.PK_Resource_Id
  };
  this.npsscoreservice.Lostlist(body)
  .subscribe(data => {
    this.Lostlist = data;
    // alert(JSON.stringify(this.Lostlist));
  });
  }

}
