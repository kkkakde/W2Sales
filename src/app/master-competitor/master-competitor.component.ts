import { Component, OnInit } from '@angular/core';
import {Competitor} from '../_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master-competitor',
  templateUrl: './master-competitor.component.html',
  styleUrls: ['./master-competitor.component.css']
})
export class MasterCompetitorComponent implements OnInit {
public Competitorlist: any;
public navigationExtras: any;
key: string = 'name'; // set default
reverse: boolean = false;
sort(key) {
  this.key = key;
  this.reverse = !this.reverse;
}
  constructor( private competitorservice: Competitor,
             private router: Router) { }

  ngOnInit() {
    this.competitorservice.GetCompetitorList()
    .subscribe(data => {
      this.Competitorlist = data;
      console.log(this.Competitorlist);
    });
  }
  navigateToAddCompetitor() {
    this.router.navigate(['/addCompetitor']);
  }
  editCompetitor(item) {
    this.navigationExtras = {
      queryParams: {
        PK_Competitor_Id: item.PK_Competitor_Id
      }
    };
    this.router.navigate(['/addCompetitor'], this.navigationExtras);
  }
}
