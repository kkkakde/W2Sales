import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRoleService } from '../_services/userRole.Service'

import { Alert } from 'selenium-webdriver';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'add-master-role',
  templateUrl: './add-role-component.html',
  styleUrls: ['./add-role-component.css']
})
export class AddMasterRoleComponent implements OnInit {
  public session: any;
  addMasterRoleForm: FormGroup;
  loading = false;
  submitted = false;
  disabledAddUpdate : boolean = false;
  public userRoleDetails : any;
  public userRoleList : any;
  public queryParamData : any;
  constructor(private formBuilder: FormBuilder,
              private Router: Router,
              private route: ActivatedRoute,
              private userRoleService: UserRoleService
   ) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };

    this.addMasterRoleForm = this.formBuilder.group({
        Role_Name: ['', Validators.required],
        Role_Description: ['', Validators.required],
        IsActive:['','']
    });

    this.queryParamData = this.route.queryParams.subscribe(params => {
      this.userRoleDetails ={
       'Role_Id' : params['PK_Role_Id'],
       'Name' : params['Name'],
       'Description' : params['Description'],
       'IsActive' : params['IsActive']
      } 
    });
   
    this.f.Role_Name.setValue(this.userRoleDetails.Name);
    this.f.Role_Description.setValue(this.userRoleDetails.Description);
    this.f.IsActive.setValue(this.userRoleDetails.IsActive);
    
  }
  get f() { return this.addMasterRoleForm.controls;
  }

  onSubmit() {
    var param;
    this.loading = true;
    this.submitted = true;
    if (this.addMasterRoleForm.invalid) {
        this.loading = false;
        return;
    }else{
      if(this.userRoleDetails.Role_Id != undefined){
         param = {
          PK_Role_Id:  this.userRoleDetails.Role_Id,
          Name: this.f.Role_Name.value,
          Description: this.f.Role_Description.value,
          IsActive: this.f.IsActive.value,
          Modified_By: this.session.session.PK_Resource_Id
        };
        this.userRoleService.updateRoleDetails(param).subscribe(result => {
          this.userRoleList = result;
          this.Router.navigate(['/masterRole']);
          this.loading = false;
        });
      }else{
         param = {
            PK_Role_Id: 0,
            Name: this.f.Role_Name.value,
            Description: this.f.Role_Description.value,
            IsActive: this.f.IsActive.value,
            Created_By: this.session.session.PK_Resource_Id
        };
        this.userRoleService.addRoleDetails(param).subscribe(result => {
              this.userRoleList = result;
              this.Router.navigate(['/masterRole']);
              this.loading = false;
        });
      }
    }
  }
}