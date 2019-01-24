import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubRangeMappingService } from '../_services/subRangeMapping.service';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-master-sub-range-mapping',
  templateUrl: './master-sub-range-mapping.component.html',
  styleUrls: ['./master-sub-range-mapping.component.css']
})
export class MasterSubRangeMappingComponent implements OnInit {
  page: number ;
  filter: any;
  totalRec: number;
  public subRangeDetails: any;
  public navigationExtras: any;
  constructor(private router: Router,
              private subRangeMappingService: SubRangeMappingService) { }

  ngOnInit() {
      this.subRangeMappingService.getSubRangeDetails().subscribe(result => {
      this.subRangeDetails = result;
    });
  }

  navigateToAddSubRange() {
    this.router.navigate(['/addSubRange']);
  }

  editSubRangeDetails(item) {
    this.navigationExtras = {
      queryParams: {
        PK_SubRange_Id:  item.PK_SubRange_Id,
        FK_W2S_List_Id: item.FK_W2S_List_Id,
        SubRange_Name: item.SubRange_Name,
        SubRange_Description: item.SubRange_Description,
        IsActive: item.IsActive
      }
    };
    this.router.navigate(['/addSubRange'], this.navigationExtras);
  }

}
