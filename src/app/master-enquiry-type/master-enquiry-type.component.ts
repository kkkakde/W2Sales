import { Component, OnInit } from '@angular/core';
import { Master } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-master-enquiry-type',
  templateUrl: './master-enquiry-type.component.html',
  styleUrls: ['./master-enquiry-type.component.css']
})
export class MasterEnquiryTypeComponent implements OnInit {
  page: number ;
  filter: any;
  totalRec: number;
  public ETypeList: any;
  public navigationExtras: any;
  key: string = 'name'; // set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private enquirytypeervice: Master,
    private router: Router) { }

  ngOnInit() {
    this.enquirytypeervice.EnquirytypeList()
    .subscribe(data => {
      this.ETypeList = data;
    });
  }
  navigateToAddEnquirytype() {
    this.router.navigate(['/addEnquiryType']);
  }
  editEnquiryType(item) {
    this.navigationExtras = {
      queryParams: {
        Enquiry_Type_Id: item.Enquiry_Type_Id
      }
    };
    this.router.navigate(['/addEnquiryType'], this.navigationExtras);
  }
}
