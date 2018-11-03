import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  addcustomerForm: FormGroup;
  submitted = false;
  public ZoneIdList = {};
  public StateIdList = {};
  public CityIdList = {};
  public IndustryIdList = {};

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor(
     private authenticationservice: AuthenticationService ,
     private formBuilder: FormBuilder,
     ) { }

  ngOnInit() {
    this.addcustomerForm = this.formBuilder.group({
      Cust_Name: ['', Validators.required],
      Cust_Address_Line1: ['', Validators.required],
      Cust_PK_Zone_Id: ['', Validators.required],
      Cust_PK_State_Id: ['', Validators.required],
      Cust_PK_City_Id: ['', Validators.required],
      Cust_GSTN_No: ['', Validators.required],
      Cust_Cmprsd_Air_App: ['', Validators.required],
      Cust_Industry_Id: ['', Validators.required],
      Cust_End_Product: ['', Validators.required],
      Cust_File: ['', Validators.required]

  });
    this.getzoneList();
    this.getindustryList();
  }
  get f() { return this.addcustomerForm.controls; }
  getzoneList()  {
    this.authenticationservice.GetZoneList()
    .pipe(first())
    .subscribe( data => {
      this.ZoneIdList = data;
    console.log(JSON.stringify( data));
    });
  }
  getstateListChange(e) {
    this.authenticationservice.GetStateList(e.target.value)
    .pipe(first())
    .subscribe( data => {
      this.StateIdList = data;
    console.log(JSON.stringify( data));
    });
 }
 getcityListChange(e) {
      this.authenticationservice.GetCityList(e.target.value)
      .pipe(first())
      .subscribe( data => {
        this.CityIdList = data;
      console.log(JSON.stringify( data));
      });
    }
  getindustryList() {
      this.authenticationservice.GetIndustryList()
      .pipe(first())
      .subscribe( data => {
        this.IndustryIdList = data;
      console.log(JSON.stringify( data));
      });
    }
    onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.addcustomerForm.invalid) {
          return;
      }
      let sumbitdata = {
        Cust_Name: this.f.Cust_Name.value,
        // Cust_Address_Line1: this.f.Cust_Address_Line1.value,
        // Cust_Address_Line2: this.f.Cust_Address_Line2.value,
        // Cust_PK_Zone_Id: this.f.Cust_PK_Zone_Id.value,
        // Cust_PK_State_Id: this.f.Cust_PK_State_Id.value,
        // Cust_PK_City_Id: this.f.Cust_PK_City_Id.value,
        // Cust_GSTN_No: this.f.Cust_GSTN_No.value,
        // Cust_Cmprsd_Air_App: this.f.Cust_Cmprsd_Air_App.value,
        // Cust_Industry_Id: this.f.Cust_Industry_Id.value,
        // Cust_End_Product: this.f.Cust_End_Product.value,
       // Cust_File: this.f.Cust_File.value,
      };
   alert(JSON.stringify(sumbitdata));
  }
 }

