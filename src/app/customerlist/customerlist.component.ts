import { Component, OnInit } from '@angular/core';
import { Customer } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
public customerlistdata: any;
public navigationExtras: any;
public setting: any;
constructor(
  private authenticationService: Customer,
  private router: Router
  ) { }

  ngOnInit() {
        this.authenticationService.getCustomerList()
            .subscribe(
                data =>  {
                  this.customerlistdata = data;
                },
                error => {
                    alert('Invalid User');
                });
  }
  editPropertyDetails(item) {
    this.navigationExtras = {
      queryParams: {
              Id: item.PK_Cust_Id
            }
           };
  this.router.navigate(['/addcustomer'], this.navigationExtras);
  }
  AddopportunityDetails(item) {
    this.navigationExtras = {
      queryParams: {
              Id: item.PK_Cust_Id,
              CustName: item.Cust_Name,
              contact: item.Cust_CntctPrson_Contact_No
            }
          };
        this.router.navigate(['/addopportunities'], this.navigationExtras);
  }
}
