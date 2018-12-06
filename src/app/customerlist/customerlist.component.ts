import { Component, OnInit } from '@angular/core';
import { Customer } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {


  public customerlistdata: any;
  public navigationExtras: any;
  public CustID: any = 0;
  public setting: any;
  public session: any;
  public Cust_NameVisit;
  public IntimeFlag: boolean;
  key: string = 'name'; // set default
  reverse:boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  };
  constructor(
    private authenticationService: Customer,
    private router: Router
  ) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.IntimeFlag = true  ;
    this.getCustomerlist();
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
  getCustomerlist() {
    var body={
      Created_By: this.session.session.PK_Resource_Id

    };
    this.authenticationService.getCustomerList(body)
      .subscribe(
      data => {
        this.customerlistdata = data;
      },
      error => {
        alert('Invalid User');
      });
  }
  onSubmitVisit() {
    if ($('#Cust_NameVisit').val() === undefined || $('#Cust_NameVisit').val() === '') {
      return false;
    }
    var body = {
      Cust_Name: $('#Cust_NameVisit').val(),
      PK_Cust_Id: 0,
      Cust_Address_Line1: '',
      Cust_Address_Line2: '',
      FK_Zone_Id: 0,
      FK_State_Id: 0,
      FK_City_Id: 0,
      Cust_GSTN_No: '',
      Cust_Cmprsd_Air_App: '',
      // Cust_Industry_Id: '',
      Cust_End_Product: '',
      Cust_File: '',
      Created_By: this.session.session.PK_Resource_Id,
      PK_Industry_Id: []
    };
    this.authenticationService.SubmitCustomerDetails(body)
      .pipe(first())
      .subscribe(data => {
        alert('Visit added successfully.');
        $('#AddVisitPopup').modal('hide');
        $('#Cust_NameVisit').val('');
        this.getCustomerlist();
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Invalid request.');
      });
  }
  outVisit(item) {
    this.IntimeFlag = true;
    var body = {
      PK_Cust_Id: item.PK_Cust_Id,
      Action: 'Out',
      Created_By: this.session.session.PK_Resource_Id,
      Visit_Tracking_Id: item.Visit_Tracking_Id,
    };
    this.authenticationService.VisitOut(body)
      .subscribe(
      data => {
        this.getCustomerlist();
      },
      error => {
        alert('Invalid User');
      });
  }
  inVisit(item) {
    this.IntimeFlag = false;
    var body = {
      PK_Cust_Id: item.PK_Cust_Id,
      Action: 'In',
      Created_By: this.session.session.PK_Resource_Id,
      Visit_Tracking_Id: item.Visit_Tracking_Id,
    };
    this.authenticationService.VisitOut(body)
      .subscribe(
      data => {
        this.getCustomerlist();
      },
      error => {
        alert('Invalid User');
      });
  }
}
