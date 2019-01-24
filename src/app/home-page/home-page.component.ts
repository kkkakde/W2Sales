import { Component, OnInit } from '@angular/core';
import { SearchFilter } from '../_services';
import { from } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
SerachForm: FormGroup;
public BLMlist: any;
public ZMlist: any;
public ASMlist: any;
public Dealerlist: any;
public SalesEngineerlist: any;
public opportunitieslistdata: any;
public customerlistdata: any;
public session: any;
public CustomerShowHidetbl: boolean;
public OpportunityShowHidetbl: boolean;
public customerName: any;
public exportExcel: any;
public list: any;
public BLMShowHidetbl = true;
public ZMShowHidetbl = true;
public ASMTMShowHidetbl = true;
public DealerShowHidetbl = true;
public SalesEShowHidetbl = true;
public ZMName;
  constructor(private searchfilterservice: SearchFilter,
              private formBuilder: FormBuilder) { }
   ngOnInit() {
    $('#Exportbtn').hide();
    $('#Backbtn').hide();
    this.OpportunityShowHidetbl = false;
    this.GetBLMDetails();
    this.GetZMDetails();
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
      };
      if (this.session.session.FK_Designation_Id === 1) { this.BLMShowHidetbl = false; }
      if (this.session.session.FK_Designation_Id === 2) {
        this.BLMShowHidetbl = false;
        this.ZMShowHidetbl = false;
        this.searchfilterservice.GetASMDetails(this.session.session.FK_Zone_Id)
        .subscribe(data => {
           this.ASMlist =  data;
        });
       }
       if (this.session.session.FK_Designation_Id === 3) {
        this.BLMShowHidetbl = false;
        this.ZMShowHidetbl = false;
        this.ASMTMShowHidetbl = false;
        let body = {
          FK_Zone_Id: this.session.session.FK_Zone_Id,
          FK_State_Id: this.session.session.FK_State_Id,
         };
        this.searchfilterservice.GetDealerDetails(body)
        .subscribe(data => {
           this.Dealerlist =  data;
        });
       }
      if (this.session.session.FK_Designation_Id === 4) {
       this.BLMShowHidetbl = false;
       this.ZMShowHidetbl = false;
       this.ASMTMShowHidetbl = false;
       this.DealerShowHidetbl = false;
       let body = {
        FK_Zone_Id: this.session.session.FK_Zone_Id,
        FK_State_Id: this.session.session.FK_State_Id,
        Dealer_Id:  this.session.session.PK_Resource_Id,
       };
      this.searchfilterservice.GetSalesEngineerDetails(body)
      .subscribe(data => {
         this.SalesEngineerlist =  data;
      });
       }
     this.SerachForm = this.formBuilder.group({
      BLMName : ['', ''],
      ZMName : ['', ''],
      ASMName : ['', ''],
      DealerName : ['', ''],
      SalesEngineer : ['', '']
    });
   }
   get f() { return this.SerachForm.controls; }
   GetBLMDetails() {
    this.searchfilterservice.GetBLMDetails()
    .subscribe(data => {
       this.BLMlist =  data;
    });
   }
   GetZMDetails() {
    this.searchfilterservice.GetZMDetails()
    .subscribe(data => {
       this.ZMlist =  data;
    });
   }
   onChangeSelectZM(val: any) {
    this.searchfilterservice.GetASMDetails(val.target.value)
    .subscribe(data => {
       this.ASMlist =  data;
    });
   }
   onChangeSelectASM() {
     let body = {
      FK_Zone_Id: this.session.session.FK_Zone_Id,
      FK_State_Id: this.f.ASMName.value,
     };
    this.searchfilterservice.GetDealerDetails(body)
    .subscribe(data => {
       this.Dealerlist =  data;
    });
   }
   onChangeSelectDealer() {
    let body = {
      FK_Zone_Id: this.session.session.FK_Zone_Id,
      FK_State_Id: this.session.session.FK_State_Id,
      Dealer_Id: this.f.DealerName.value
     };
    this.searchfilterservice.GetSalesEngineerDetails(body)
    .subscribe(data => {
       this.SalesEngineerlist =  data;
    });
   }
   onSubmit() {
    let body = {
      FK_Zone_Id: this.f.ZMName.value,
      FK_State_Id: this.f.ASMName.value,
      AreaManager_Id: this.f.DealerName.value,
      PK_Resource_Id: this.f.SalesEngineer.value
    };
    this.searchfilterservice.SearchData(body)
    .subscribe(data => {
      this.list = data;
      this.customerlistdata = data;
      if (this.list.length === 0 ) {
        $('#Exportbtn').hide();
        this.CustomerShowHidetbl = false;
        alert('Not found data');
      } else {
        this.CustomerShowHidetbl = true;
        $('#Exportbtn').show();
       }
    });
   }
   exportAsCust() {
     if (this.CustomerShowHidetbl === true) {
      var arry = [];
      for (let index = 0; index < this.list.length; index++) {
        arry.push({ 'Sr No': index + 1,
                    'Customer Name' : this.list[index].Cust_Name,
                    'Visit Type': this.list[index].VisitType,
                    'Address' : this.list[index].Cust_Address_Line1,
                    'Comp Air App' : this.list[index].Cust_Cmprsd_Air_App,
                    'End Product' : this.list[index].Cust_End_Product,
                    'Contact' : this.list[index].Cust_CntctPrson_Contact_No,
                  });
      }
      this.exportExcel = arry;
      this.searchfilterservice.exportAsExcelFile(this.exportExcel , 'CustomerDetails');
     } else {
      var arry1 = [];
      for (let index = 0; index < this.list.length; index++) {
        arry1.push({ 'Sr No': index + 1,
                    'Account Name' : this.list[index].Cust_Name,
                    'Opportunity Name': this.list[index].Opportunity_Name,
                    'Expected Order Date' : this.list[index].Closed_Date,
                    'Sales Phase' : this.list[index].Sales_Phase,
                    'Owner' : this.list[index].Resource_Name,
                    'Created On' : this.list[index].Added_Date,
                    'Expected Value' : this.list[index].Expected_Value,
                    'Status' : this.list[index].Status,
                  });
      }
      this.exportExcel = arry1;
      this.searchfilterservice.exportAsExcelFile(this.exportExcel , this.customerName );
      this.CustomerShowHidetbl = false;
     }
   }
   OpportunityDetails(item) {
    $('#Searchbtn').hide();
    $('#Exportbtn').hide();
    this.customerName = item.Cust_Name;
    this.searchfilterservice.OpportunityData(item.PK_Cust_Id)
    .subscribe(data1 => {
      this.opportunitieslistdata = data1;
      if (this.opportunitieslistdata.length === 0 ) {
        alert('Not found data');
        $('#Backbtn').show();
        this.OpportunityShowHidetbl = false;
        this.CustomerShowHidetbl = true;
      } else {
        this.list = data1;
        $('#Exportbtn').hide();
        $('#Backbtn').show();
        this.CustomerShowHidetbl = false;
        this.OpportunityShowHidetbl = true;
       }
    });
   }
   BacktoCustomer() {
    $('#Searchbtn').show();
    $('#Exportbtn').show();
    this.CustomerShowHidetbl = true;
    this.list =  this.customerlistdata;
    this.OpportunityShowHidetbl = false;
    this.opportunitieslistdata = null;
   }
}
