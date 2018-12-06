import { Component, OnInit } from '@angular/core';
import { Master } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-master-enquiry-source',
  templateUrl: './master-enquiry-source.component.html',
  styleUrls: ['./master-enquiry-source.component.css']
})
export class MasterEnquirySourceComponent implements OnInit {
public ESourceList: any;
public navigationExtras: any;
key: string = 'name'; // set default
reverse: boolean = false;
sort(key) {
  this.key = key;
  this.reverse = !this.reverse;
}
  constructor(private enquirysourceservice: Master,
    private router: Router) { }

  ngOnInit() {
    this.enquirysourceservice.EnquirySourceList()
    .subscribe(data => {
      this.ESourceList = data;
    });
  }
  navigateToAddEnquirySource() {
    this.router.navigate(['/addEnquirySource']);
  }
  editEnquirySource(item) {
    this.navigationExtras = {
      queryParams: {
        Enquiry_Source_Id: item.Enquiry_Source_Id
      }
    };
    this.router.navigate(['/addEnquirySource'], this.navigationExtras);
  }
}
