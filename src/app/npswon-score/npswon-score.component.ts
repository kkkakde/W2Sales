import { Component, OnInit } from '@angular/core';
import { NPSScores } from '../_services';

@Component({
  selector: 'app-npswon-score',
  templateUrl: './npswon-score.component.html',
  styleUrls: ['./npswon-score.component.css']
})
export class NPSWonScoreComponent implements OnInit {
  public Wonlist: any;
  public session: any;
  constructor(private npssourceservice: NPSScores) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
      };
    let body = {
      Created_By: this.session.session.PK_Resource_Id
    };
    this.npssourceservice.WonList(body)
    .subscribe(data => {
      this.Wonlist = data;
    });
  }

}
