import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addopportunities',
  templateUrl: './addopportunities.component.html',
  styleUrls: ['./addopportunities.component.css']
})
export class AddopportunitiesComponent implements OnInit {
        addOpportunitiesForm:FormGroup;
        submitted = false;
        public OpportunitySourcelist = {};
        public OpportunityTypelist = {};
        public ChanceofSuccessList = {};
        public SalesPhaseList = {};
        public StatusList = {};

        constructor(
          private authenticationservice: AuthenticationService,
          private formBuilder: FormBuilder,
          ) { }

            ngOnInit() {
              this.addOpportunitiesForm = this.formBuilder.group({
                Cust_Name: ['', Validators.required],
                Enquiry_Source_Id: ['', Validators.required],
                Enquiry_Type_Id: ['', Validators.required],
                Expected_Value: ['', Validators.required],
                List_Code: ['', Validators.required],  
                List_CodeSales: ['', Validators.required],
                List_CodeStatus: ['', Validators.required],

            });
            this.getOpportunitySourceList();
            this.getOpportunityTypeList();
            this.getChanceofSuccessList();
            this.getSalesPhaseList();
            this.getStatusList();
            }
          get f() { return this.addOpportunitiesForm.controls; }
          getOpportunitySourceList(){
            this.authenticationservice.getOpportunitySourceList()
            .pipe(first())
            .subscribe( data => {
              this.OpportunitySourcelist = data;
            console.log(JSON.stringify( data));
            });
          }
          getOpportunityTypeList(){
            this.authenticationservice.getOpportunityTypeList()
            .pipe(first())
            .subscribe( data => {
              this.OpportunityTypelist = data;
              });
          }
          getChanceofSuccessList(){
            this.authenticationservice.getChanceofSuccessList()
            .pipe(first())
            .subscribe( data => {
              this.ChanceofSuccessList = data;
                });
          }
          getSalesPhaseList(){
            this.authenticationservice.getSalesPhaseList()
            .pipe(first())
            .subscribe( data => {
              this.SalesPhaseList = data;
                });
          }
          getStatusList(){
            this.authenticationservice.getStatusList()
            .pipe(first())
            .subscribe( data => {
              this.StatusList = data;
                });
          }

          onSubmit() {
            this.submitted = true;
            if (this.addOpportunitiesForm.invalid) {
                return;
            }
            alert("hii");
            let sumbitdata = {
              Cust_Name: this.f.Cust_Name.value,
              Enquiry_Source_Id: this.f.Enquiry_Source_Id.value,
              Enquiry_Type_Id: this.f.Enquiry_Type_Id.value,
              Expected_Value: this.f.Expected_Value.value,
              List_Code: this.f.List_Code.value,
              List_CodeSales: this.f.List_CodeSales.value,
              List_CodeStatus: this.f.List_CodeStatus.value
            };
         alert(JSON.stringify(sumbitdata));
        }

}
