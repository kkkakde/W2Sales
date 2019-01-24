import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubRangeMappingService } from '../_services/subRangeMapping.service';
@Component({
  selector: 'app-master-range-mapping',
  templateUrl: './master-range-mapping.component.html',
  styleUrls: ['./master-range-mapping.component.css']
})
export class MasterRangeMappingComponent implements OnInit {
  page: number ;
  filter: any;
  totalRec: number;
  public rangeMappingDetails: any;
  constructor(private Router: Router,
              private subRangeMappingService : SubRangeMappingService) { }
  ngOnInit() {
    this.subRangeMappingService.getRangeMappingDetails().subscribe(result => {
      this.rangeMappingDetails = result;
      // console.log("this.rangeMappingDetails  ", this.rangeMappingDetails);
    });
  }
  navigateToRangeMapping() {
    this.Router.navigate(['/addRangeMapping']);
  }
}
