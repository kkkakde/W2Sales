import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceDetails } from '../_models/resource';
import { Resource } from '../_services';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-master-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {
  public session: any;
  addresourceForm: FormGroup;
  loading = false;
  submitted = false;
  public Designationlist: any;
  public Zonelist: any;
  public Statelist: any;
  public ASMlist: any;
  public DealerList: any;
  public RList: any;
  public ZoneShowHideFlag: boolean;
  public stateShowHideFlag: boolean;
  public ASMShowHideFlag: boolean;
  public DealerShowHideFlag: boolean;
  public disabledReset: boolean ;
  public ResourceId;
  public mobileNum: any;
  ResourceDetail = new ResourceDetails();
  public queryParamData: any;
  constructor(private resourceservice: Resource,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

    ngOnInit() {
              this.stateShowHideFlag = false;
              this.ZoneShowHideFlag = false;
              this.ASMShowHideFlag = false;
              this.DealerShowHideFlag = false;
              this.disabledReset = true;
              this.ResourceId = 0;
              this.GetDesignationList();
              this.GetZoneList();
              this.session = {
              session: JSON.parse(localStorage.getItem('currentUser'))
              };
              this.addresourceForm = this.formBuilder.group({
              Resource_Name : ['', Validators.required],
              LoginID : ['',  Validators.required],
              Resource_Password : ['',  Validators.required],
              Resource_EmailID : ['', Validators.required],
              Resource_Mobile_No : ['',  Validators.required],
              ddlDesignation : ['',  Validators.required],
              ddlZone : ['',  ''],
              ddlstate : ['',  ''],
              IsActive : ['', ''],
              ddlASM : ['', ''],
              ddlDealer : ['', '']
              });
              this.queryParamData = this.route.queryParams.subscribe(params => {
                if ( params['PK_Resource_Id'] !== undefined) {
                this.resourceservice.ResourceList(params['PK_Resource_Id'])
               .subscribe(data => {
                this.RList = data;
                this.ResourceId = this.RList[0].PK_Resource_Id;
                this.addresourceForm.setValue({
                   Resource_Name: this.RList[0].Resource_Name,
                   LoginID: this.RList[0].Resource_Login_Id,
                   Resource_Password: this.RList[0].Resource_Password ,
                   Resource_EmailID : this.RList[0].Resource_Email_Id,
                   Resource_Mobile_No: this.RList[0].Resource_Mobile_No,
                   ddlDesignation: this.RList[0].FK_Designation_Id,
                   ddlZone: this.RList[0].FK_Zone_Id,
                   ddlstate: this.RList[0].FK_State_Id,
                   ddlASM: this.RList[0].AreaManager_Id,
                   ddlDealer: this.RList[0].Dealer_Id,
                   IsActive: this.RList[0].IsActive === 1 ? true : false
                });
                this.disabledReset = false;
                if (this.RList[0].FK_Designation_Id !== 1 ) {
                this.ZoneShowHideFlag = true;
                this.resourceservice.GetStateList(this.RList[0].FK_Zone_Id)
                .subscribe(data1 => {
                  this.Statelist = data1;
                });
                } else { this.ZoneShowHideFlag = false; }
                if (this.RList[0].FK_Designation_Id === 3 || this.RList[0].FK_Designation_Id === 4 ||
                  this.RList[0].FK_Designation_Id === 5) { this.stateShowHideFlag = true;
                } else {  this.stateShowHideFlag = false ; }
                if (this.RList[0].FK_Designation_Id === 4 || this.RList[0].FK_Designation_Id === 5) {
                  this.ASMShowHideFlag = true;
                  this.resourceservice.GetASMTMList(this.RList[0].FK_State_Id)
                  .subscribe(data1 => {
                    this.ASMlist = data1;
                  });
                } else {  this.ASMShowHideFlag = false ; }
                if (this.RList[0].FK_Designation_Id === 5) {
                this.DealerShowHideFlag = true;
                this.resourceservice.GetDealerList(this.RList[0].AreaManager_Id)
                .subscribe(data2 => {
                  this.DealerList = data2;
                });
                } else {this.DealerShowHideFlag = false; }
              });
            }
          });
    }
    get f() { return this.addresourceForm.controls; }
    GetDesignationList() {
      this.resourceservice.GetDesignationList()
        .subscribe(data => {
          this.Designationlist = data;
        });
    }
    GetZoneList() {
      this.resourceservice.GetZoneList()
        .subscribe(data => {
          this.Zonelist = data;
        });
    }
    onChangeSelectZone(val: any) {
      this.resourceservice.GetStateList(val.target.value)
      .subscribe(data => {
        this.Statelist = data;
      });
    }
    onChangeSelectstate(val: any) {
      this.resourceservice.GetASMTMList(val.target.value)
      .subscribe(data => {
        this.ASMlist = data;
      });
      this.f.ddlASM.setValue('');
      this.f.ddlDealer.setValue('');
      this.resourceservice.GetDealerList(0)
      .subscribe(data => {
        this.DealerList = data;
      });
    }
    onChangeSelectASM(val: any) {
      this.resourceservice.GetDealerList(val.target.value)
      .subscribe(data => {
        this.DealerList = data;
      });
    }
    onChangeSelectDesignation(val: any) {
            if (val.target.value !== '1') {
              this.ZoneShowHideFlag = true;
            } else { this.ZoneShowHideFlag = false; }
            if (val.target.value === '4' || val.target.value === '5') {
              this.stateShowHideFlag = true; this.ASMShowHideFlag = true;
            } else {  this.stateShowHideFlag = false ;  this.ASMShowHideFlag = false; }
            if (val.target.value === '3' || val.target.value === '4' || val.target.value === '5') {
              this.stateShowHideFlag = true;
            } else {  this.stateShowHideFlag = false ; }
            if (val.target.value === '5') { this.DealerShowHideFlag = true; } else {  this.DealerShowHideFlag = false ; }
    }
    onSubmit() {
    this.submitted = true;
    if (this.addresourceForm.invalid) {
      return;
    }
    if (!$('#MobileNo').val().match('[0-9]{10}')) {
           alert('Please put 10 digit mobile number');
           return;
           }
      let body = {
        PK_Resource_Id: this.ResourceId,
        Resource_Name: this.f.Resource_Name.value,
        Resource_Login_Id: this.f.LoginID.value,
        Resource_Password: this.f.Resource_Password.value,
        Resource_Email_Id: this.f.Resource_EmailID.value,
        Resource_Mobile_No: this.f.Resource_Mobile_No.value,
        FK_Designation_Id: this.f.ddlDesignation.value,
        FK_Zone_Id : this.f.ddlZone.value,
        FK_State_Id : this.f.ddlstate.value,
        AreaManager_Id : this.f.ddlASM.value,
        Dealer_Id : this.f.ddlDealer.value,
        IsActive: this.f.IsActive.value === true ? 1 : 0,
        Created_By: this.session.session.PK_Resource_Id
      };
      this.resourceservice.addResourceDetails(body)
      .subscribe(data => {
        alert('Save successfully');
        this.router.navigate(['/masterResource']);
      });
    }
    Reset() {
      this.addresourceForm.reset();
    }









    
    }
