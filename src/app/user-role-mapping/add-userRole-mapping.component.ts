import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRoleService } from '../_services/userRole.Service'
import { CommonService } from '../_services/common.service';

import { Alert } from 'selenium-webdriver';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'add-user-role',
  templateUrl: './add-userRole-mapping.component.html',
  styleUrls: ['./add-userRole-mapping.component.css']
})
export class AddUserRoleMappingComponent implements OnInit {
  timer: any = null;
  public session: any;
  addUserRoleMappingForm: FormGroup;
  loading = false;
  submitted = false;
  disabledAddUpdate : boolean = false;
  public userRoleMapping : any;
  public userRoleList : any;
  public roleList: any;
  public userList : any;
  public zoneList : any;
  public stateList : any;
  public queryParamData : any;
  constructor(private formBuilder: FormBuilder,
              private Router: Router,
              private route: ActivatedRoute,
              private userRoleService: UserRoleService,
              private commonService : CommonService
   ) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.getUserDetails();
    this.getMasterRoles();
    this.getZoneList();

    this.addUserRoleMappingForm = this.formBuilder.group({
        User_Name: ['', Validators.required],
        Role_Type: ['', Validators.required],
        Zone_Name: ['', Validators.required],
        State_Name: ['', Validators.required],
        IsActive:['','']
    });

    this.queryParamData = this.route.queryParams.subscribe(params => {
      this.userRoleMapping ={
       'PK_UserRole_Id' : params['PK_UserRole_Id'],
       'FK_User_Id' : params['FK_User_Id'],
       'FK_Role_Id' : params['FK_Role_Id'],
       'FK_Zone_Id' : params['FK_Zone_Id'],
       'FK_State_Id' : params['FK_State_Id'],
       'IsActive' : params['IsActive']
      } 
    });
    this.f.Zone_Name.setValue(this.userRoleMapping.FK_Zone_Id);
    this.f.User_Name.setValue(this.userRoleMapping.FK_User_Id);
    this.f.Role_Type.setValue(this.userRoleMapping.FK_Role_Id);
    this.f.State_Name.setValue(this.userRoleMapping.FK_State_Id);
    this.f.IsActive.setValue(this.userRoleMapping.IsActive);
    this.getStateList_update(this.userRoleMapping.FK_Zone_Id);

  }

  get f() { return this.addUserRoleMappingForm.controls;
  }
  
  getUserDetails(){
    this.commonService.getUserDetails().subscribe(result => {
      this.userList = result;
      console.log("", this.userList);
    });
    
  }

  getMasterRoles(){
    this.userRoleService.getAllRoleDetails().subscribe(result => {
      this.roleList = result;
    });
  }

  getZoneList(){
    this.commonService.getZoneList().subscribe(result => {
      this.zoneList = result;
    });
  }
  
  getStateList(e){
    this.commonService.getStateList(e.target.value).subscribe(result => {
      this.stateList = result;
    });
  }

  getStateList_update(zoneId){
    this.commonService.getStateList(zoneId).subscribe(result => {
      this.stateList = result;
    });
  }

 
  onSubmit() {
    var param;
    this.loading = true;
    this.submitted = true;
    if (this.addUserRoleMappingForm.invalid) {
        this.loading = false;
        return;
    }else{
      if(this.userRoleMapping.PK_UserRole_Id != undefined){
         param = {
          PK_UserRole_Id:  this.userRoleMapping.PK_UserRole_Id,
          FK_User_Id: this.f.User_Name.value,
          FK_Role_Id: this.f.Role_Type.value,
          FK_Zone_Id: this.f.Zone_Name.value,
          FK_State_Id: this.f.State_Name.value,
          IsActive: this.f.IsActive.value,
          Modified_By: this.session.session.PK_Resource_Id
        };
        this.userRoleService.updateUserRoleMappingDetails(param).subscribe(result => {
          this.userRoleList = result;
          this.Router.navigate(['/userRoleMapping']);
          this.loading = false;
        });
      }else{
         param = {
            PK_UserRole_Id: 0,
            FK_User_Id: this.f.User_Name.value,
            FK_Role_Id: this.f.Role_Type.value,
            FK_Zone_Id: this.f.Zone_Name.value,
            FK_State_Id: this.f.State_Name.value,
            IsActive: this.f.IsActive.value,
            Created_By: this.session.session.PK_Resource_Id
        };
        this.userRoleService.addUserRoleMappingDetails(param).subscribe(result => {
              this.userRoleList = result;
              this.Router.navigate(['/userRoleMapping']);
              this.loading = false;
        });
      }
    }
  }
}