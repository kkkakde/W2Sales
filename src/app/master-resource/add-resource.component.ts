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
  public Designationlist = {};
  public Zonelist = {};
  public Statelist = {};
  public RList = {};
  public ZoneShowHideFlag: boolean;
  public stateShowHideFlag: boolean;
  public disabledReset: boolean ;
  public ResourceId;
  ResourceDetail = new ResourceDetails();
  public queryParamData: any;
  constructor(private resourceservice: Resource,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

    ngOnInit() {
              this.stateShowHideFlag = false;
              this.ZoneShowHideFlag = false;
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
              Resource_Password : ['',  Validators.required, Validators.minLength(6)],
              Resource_EmailID : ['', [Validators.required, Validators.email]],
              Resource_Mobile_No : ['',  Validators.required],
              ddlDesignation : ['',  Validators.required],
              ddlZone : ['',  ''],
              ddlstate : ['',  ''],
              IsActive : ['', '']
              });
              this.queryParamData = this.route.queryParams.subscribe(params => {
                if ( params['PK_Resource_Id'] !== undefined) {

               this.resourceservice.ResourceList(params['PK_Resource_Id'])
               .subscribe(data => {
                this.RList = data;
                this.disabledReset = false;
                this.ResourceId = this.RList[0].PK_Resource_Id;
                this.f.Resource_Name.setValue(this.RList[0].Resource_Name);
                this.f.LoginID.setValue(this.RList[0].Resource_Login_Id);
                this.f.Resource_Password.setValue(this.RList[0].Resource_Password);
                this.f.Resource_EmailID.setValue(this.RList[0].Resource_Email_Id);
                this.f.Resource_Mobile_No.setValue(this.RList[0].Resource_Mobile_No);
                this.f.ddlDesignation.setValue(this.RList[0].FK_Designation_Id);
                this.f.ddlZone.setValue(this.RList[0].FK_Zone_Id);
                this.f.ddlstate.setValue(this.RList[0].FK_State_Id);
                this.f.IsActive.setValue(this.RList[0].IsActive === 1 ? true : false);
                if (this.RList[0].FK_Designation_Id === 4 || this.RList[0].FK_Designation_Id === 5 ||
                   this.RList[0].FK_Designation_Id === 6 || this.RList[0].FK_Designation_Id === 7) {
                  this.ZoneShowHideFlag = true;
                  this.resourceservice.GetStateList(this.RList[0].FK_Zone_Id)
                  .subscribe(data1 => {
                    this.Statelist = data1;
                  });
                } else {
                  this.ZoneShowHideFlag = false;
                }
                if (this.RList[0].FK_Designation_Id === 6 || this.RList[0].FK_Designation_Id === 7) {
                  this.stateShowHideFlag = true;
                } else {  this.stateShowHideFlag = false ; }
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
    onChangeSelectDesignation(val: any) {
          if (val.target.value === '4' || val.target.value === '5' || val.target.value === '6' || val.target.value === '7') {
              this.ZoneShowHideFlag = true;
            } else {
              this.ZoneShowHideFlag = false;
            }
            if (val.target.value === '6' || val.target.value === '7') {
              this.stateShowHideFlag = true;
            } else {  this.stateShowHideFlag = false ; }
    }
    onChangeSelectZone(val: any) {
            this.resourceservice.GetStateList(val.target.value)
            .subscribe(data => {
              this.Statelist = data;
            });
    }
    onSubmit() {
    this.submitted = true;
    if (this.addresourceForm.invalid) {
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
        FK_State_Id : this.f.ddlstate.value,
        FK_Zone_Id : this.f.ddlZone.value,
        IsActive: this.f.IsActive.value === true ? 1 : 0,
        Created_By: this.session.session.PK_Resource_Id
      };
      this.resourceservice.addResourceDetails(body)
      .subscribe(data => {
        alert('Resource save successfully');
        this.router.navigate(['/masterResource']);
      });
    }
    Reset() {
      this.addresourceForm.reset();
    }
    }