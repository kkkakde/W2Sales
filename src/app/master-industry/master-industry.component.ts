import { Component, OnInit } from '@angular/core';
import { Master } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-master-industry',
  templateUrl: './master-industry.component.html',
  styleUrls: ['./master-industry.component.css']
})
export class MasterIndustryComponent implements OnInit {
  page: number ;
  filter: any;
  totalRec: number;
  public IndustryList: any;
  public navigationExtras: any;
  key: string = 'name'; // set default
  reverse:boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  };
  constructor(private industryservice: Master,
    private router: Router) { }

  ngOnInit() {
    this.industryservice.Get_Industry_List()
        .subscribe(data => {
          this.IndustryList = data;
        });
  }
  navigateToAddIndustry() {
    this.router.navigate(['/addIndustry']);
  }
  editIndustry(item) {
    this.navigationExtras = {
      queryParams: {
        Industry_Id: item.Industry_Id
      }
    };
    this.router.navigate(['/addIndustry'], this.navigationExtras);
  }
}
