import { Component, OnInit } from '@angular/core';
import { Customer } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  recordNotesForm: FormGroup;
  submitted = false;
  public loading;
  page: number ;
  filter: any;
  totalRec: number;
  public CustOpp: any;
  public customerlistdata: any;
  public navigationExtras: any;
  public CustID: any = 0;
  public setting: any;
  public session: any;
  public Cust_NameVisit;
  public IntimeFlag: boolean;
  public Msg = '';
  public difficult_tasks = [];
  public CustomerId;
  public Visit_Tracking_Id;
  public Action;
  key: string = 'name'; // set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(
    private authenticationService: Customer,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.IntimeFlag = true  ;
    this.getCustomerlist();
    this.recordNotesForm = this.formBuilder.group({
      remark: ['', ''],
    });
  }
  get f() { return this.recordNotesForm.controls; }
  OpenVisit() {
    $('#Cust_NameVisit').val('');
    this.Msg = '';
    $('#AddVisitPopup').modal({backdrop: false, keyboard: false, show: true});
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
    let body = {
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
      this.Msg = 'Customer name is required';
      return;
    }
    if ($('#Cust_VisitType').val() === undefined || $('#Cust_VisitType').val() === '' || $('#Cust_VisitType').val() === null) {
      this.Msg = 'Customer visit type is required';
      return;
    }
    let body = {
      Cust_Name: $('#Cust_NameVisit').val(),
      PK_Cust_Id: 0,
      Cust_Address_Line1: '',
      Cust_Address_Line2: '',
      LandlineNo: '',
      VisitType: $('#Cust_VisitType').val(),
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
        $('#Cust_NameVisit').val('');
        this.Msg = '';
        $('#AddVisitPopup').modal('hide');
        this.getCustomerlist();
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Invalid request.');
      });
  }
  outVisit(item) {
  // if (this.customerlistdata[0].Cust_CntctPrson_Contact_No == null || this.customerlistdata[0].Cust_CntctPrson_Contact_No === undefined) {
  //     alert('Please assign contact person');
  //     return false;
  //   }
    let body1 = {
      FK_Customer_Id: item.PK_Cust_Id,
      Created_By: this.session.session.PK_Resource_Id
    };
    this.authenticationService.CheckOpportunity(body1)
      .subscribe(data => {
        alert(JSON.stringify(data));
        this.CustOpp = data;
        alert(JSON.stringify( this.CustOpp));
        if (this.CustOpp.length === 0) {
          $('#RecordNotes').modal('show');
          this.Action = 'Out';
          this.CustomerId = item.PK_Cust_Id;
          this.Visit_Tracking_Id = item.Visit_Tracking_Id;
          return false;
        } else {
          this.IntimeFlag = true;
          var body = {
            PK_Cust_Id: item.PK_Cust_Id,
            Action: 'Out',
            Created_By: this.session.session.PK_Resource_Id,
            Visit_Tracking_Id: item.Visit_Tracking_Id,
          };
          this.authenticationService.VisitOut(body)
            .subscribe(
            res => {
              this.getCustomerlist();
            },
            error => {
              alert('Invalid User');
            });
        }
      });
  }
  inVisit(item) {
    const result = this.customerlistdata.filter( x => x.TrackInTime === true );
    this.IntimeFlag = false;
    let body = {
      PK_Cust_Id: item.PK_Cust_Id,
      Action: 'In',
      Created_By: this.session.session.PK_Resource_Id,
      Visit_Tracking_Id: item.Visit_Tracking_Id,
    };
    if (result !== undefined && result.length > 0) {
      const r = confirm('are you sure you want to out !');
      if (r === true) {
        // check Codition Sales Engineer another customer  In
        let body1 = {
          FK_Customer_Id: result[0].PK_Cust_Id,
          Created_By: this.session.session.PK_Resource_Id
        };
        this.authenticationService.CheckOpportunity(body1)
        .subscribe(data => {
          this.CustOpp = data;
          if (this.CustOpp.length === 0) {
            $('#RecordNotes').modal('show');
            this.Action = 'In';
            this.CustomerId = item.PK_Cust_Id;
            this.Visit_Tracking_Id = item.Visit_Tracking_Id;
            return false;
          } else {
            this.authenticationService.VisitOut(body)
            .subscribe(
            res => {
              this.getCustomerlist();
            },
            error => {
              alert('Invalid User');
            });
          }
        });
      }
    } else {
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
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.recordNotesForm.invalid) {
      return;
    }
    let body2 = {
      FK_Customer_Id: this.CustomerId,
      Remark: this.f.remark.value,
    };
    this.authenticationService.AddCustomerRemark(body2)
      .subscribe(data => {
        $('#RecordNotes').modal('hide');
        alert('Save successfully');
        let body = {
          PK_Cust_Id: this.CustomerId,
          Action: this.Action,
          Created_By: this.session.session.PK_Resource_Id,
          Visit_Tracking_Id: this.Visit_Tracking_Id,
        };
          this.authenticationService.VisitOut(body)
            .subscribe(
            data1 => {
              this.getCustomerlist();
              this.loading = false;
            },
            error => {
              alert('Invalid User');
              this.loading = false;
            });
      },
      error => {
        console.log(JSON.stringify(error));
        this.loading = false;
        $('#RecordNotes').modal('hide');
        alert('Error');
      });
  }
}
