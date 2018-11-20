import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Opportunities } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addopportunities',
  templateUrl: './addopportunities.component.html',
  styleUrls: ['./addopportunities.component.css']
})
export class AddopportunitiesComponent implements OnInit {
        addOpportunitiesForm: FormGroup;
        submitted = false;
        public OpportunitySourcelist = {};
        public OpportunityTypelist = {};
        public ChanceofSuccessList = {};
        public SalesPhaseList = {};
        public StatusList = {};
        private sub: any;
        public session: any;
        constructor(
          private authenticationservice: Opportunities,
          private formBuilder: FormBuilder,
          private router: Router,
          private route: ActivatedRoute
          ) { }

            ngOnInit() {
              this.session = {
                session: JSON.parse(localStorage.getItem('currentUser'))
              };
              this.addOpportunitiesForm = this.formBuilder.group({
                Cust_Name: ['', Validators.required],
                Enquiry_Source_Id: ['', Validators.required],
                Enquiry_Type_Id: ['', Validators.required],
                Expected_Value: ['', Validators.required],
                List_Code: ['', Validators.required],
                List_CodeSales: ['', Validators.required],
                List_CodeStatus: ['', ''],
                Startdate: ['',  ''],
                closeddate: ['', ''],
                Forecast: ['', ''],
                Customer_Contact_No: ['', ''],
                Opportunity_Name: ['', ''],
                CustomerId: ['', '']
            });

            this.getOpportunitySourceList();
            this.getOpportunityTypeList();
            this.getChanceofSuccessList();
            this.getSalesPhaseList();
            this.getStatusList();

              this.sub = this.route.queryParams.subscribe(params =>
              {
              this.f.CustomerId.setValue(params['Id']);
              this.f.Cust_Name.setValue(params['CustName']);
              this.f.Customer_Contact_No.setValue(params['contact']);
              this.f.Opportunity_Name.setValue(params['Opportunity_Name']);
              this.f.Expected_Value.setValue(params['Expected_Value']);
             });

             $('#Startdate').datepicker({
              showAnim: "fadeIn",
              format: "dd-M-yyyy",
              startDate: '+1d',
              setDate: new Date(),
              // endDate: '+' + $("#maxdate").val() + 'd',
              // endDate: '+30d',
              defaultDate: new Date(), autoclose: true
          }).on('changeDate', function (ev) {
              (ev.viewMode == 'days') ? $(this).datepicker('hide') : '';
              var dateData = $(this).val();
              $(this).value = dateData;
              $('#Visit_End_Date').val('').removeAttr('disabled');
              $('#Visit_End_Date').datepicker('remove');
              $('#Visit_End_Date').datepicker({ showAnim: "fadeIn", format: "dd-M-yyyy", startDate: $('#Visit_Start_Date').val(), clearBtn: true, autoclose: true });
          });
          $('#closeddate').datepicker({
              showAnim: "fadeIn",
              format: "dd-M-yyyy",
              startDate: '+1d',
              setDate: new Date(),
              //  endDate: '+' + $("#maxdate").val() + 'd',
              // endDate: '+30d',
              defaultDate: new Date(), autoclose: true
          });
          $('.datepicker1').datepicker({
              format: 'dd-M-yyyy',
              // startDate1: new Date(),
              startDate: '+1d',
              //  minDate: new Date(),
              setDate: new Date(),
              endDate: '+' + 2 + 'y',
              autoclose: true, todayHighlight: true,
              allowInputToggle: true,
              clearBtn: true
          }).on('changeDate', function (ev) {
              (ev.viewMode == 'days') ? $(this).datepicker('hide') : '' ;
              var dateData = $(this).val();
              $(this).value = dateData;
          });
          }
          get f() { return this.addOpportunitiesForm.controls; }
          getOpportunitySourceList() {
            this.authenticationservice.getOpportunitySourceList()
            .pipe(first())
            .subscribe( data => {
              this.OpportunitySourcelist = data;
            console.log(JSON.stringify( data));
            });
          }
          getOpportunityTypeList() {
            this.authenticationservice.getOpportunityTypeList()
            .pipe(first())
            .subscribe( data => {
              this.OpportunityTypelist = data;
              });
          }
          getChanceofSuccessList() {
            this.authenticationservice.getChanceofSuccessList()
            .pipe(first())
            .subscribe( data => {
              this.ChanceofSuccessList = data;
                });
          }
          getSalesPhaseList() {
            this.authenticationservice.getSalesPhaseList()
            .pipe(first())
            .subscribe( data => {
              this.SalesPhaseList = data;
                });
          }
          getStatusList() {
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
            if (  $('#Startdate').val() === '' || $('#closeddate').val() === '' ) {
              alert('Select Start Date and End Date');
            }
            let body = {
              FK_Customer_Id: this.f.CustomerId.value,
              Customer_Contact_No: this.f.Customer_Contact_No.value,
              FK_Opportunity_Source: this.f.Enquiry_Source_Id.value,
              FK_Opportunity_Type: this.f.Enquiry_Type_Id.value,
              Opportunity_Name: this.f.Opportunity_Name.value,
              Expected_Value: this.f.Expected_Value.value,
              Chance_Of_Success: this.f.List_Code.value,
              Sales_Phase: this.f.List_CodeSales.value,
              FK_Status: this.f.List_CodeStatus.value,
              Start_Date: $('#Startdate').val(), // this.f.Startdate.value,
              Closed_Date: $('#closeddate').val(),
              Forecast: this.f.Forecast.value,
              Created_By: this.session.session.PK_Resource_Id
            };
           this.authenticationservice.AddOpportunity(body)
            .pipe(first())
            .subscribe( data => {
              alert('Opportunity save successfully');
              this.router.navigate(['/opportunitieslist']);
                },
                error => {
                  console.log(JSON.stringify(error))
                  alert('Error');
                } );
        }
}
$(document).ready(function () {
 
  
});
