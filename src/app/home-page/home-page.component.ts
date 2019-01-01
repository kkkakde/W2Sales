import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { from } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import { FormGroup, FormBuilder } from '@angular/forms';
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
public customerlistdata: any;
public session: any;
  constructor(private userservice: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.GetBLMDetails();
    this.GetZMDetails();
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
      };
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
    this.userservice.GetBLMDetails()
    .subscribe(data => {
       this.BLMlist =  data;
    });
   }
   GetZMDetails() {
    this.userservice.GetZMDetails()
    .subscribe(data => {
       this.ZMlist =  data;
    });
   }
   onChangeSelectZM(val: any) {
    this.userservice.GetASMDetails(val.target.value)
    .subscribe(data => {
       this.ASMlist =  data;
    });
   }
   onChangeSelectASM() {
     let body = {
      FK_Zone_Id: this.f.ZMName.value,
      FK_State_Id: this.f.ASMName.value,
     };
    this.userservice.GetDealerDetails(body)
    .subscribe(data => {
       this.Dealerlist =  data;
    });
   }
   onChangeSelectDealer() {
    let body = {
      FK_Zone_Id: this.f.ZMName.value,
      FK_State_Id: this.f.ASMName.value,
      AreaManager_Id: this.f.DealerName.value
     };
    this.userservice.GetSalesEngineerDetails(body)
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
    this.userservice.SearchData(body)
    .subscribe(data => {
      this.customerlistdata = data;
    });
   }
}
