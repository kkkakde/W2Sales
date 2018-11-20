import { Component, OnInit } from '@angular/core';
import { Opportunities} from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-opportunitieslist',
  templateUrl: './opportunitieslist.component.html',
  styleUrls: ['./opportunitieslist.component.css']
})
export class OpportunitieslistComponent implements OnInit {
  addCompetitorForm: FormGroup;
  submitted = false;
  public opportunitieslistdata = {};
  public Customerlist: any;
  public ContactPersonlist = {};
  public Documentlist = {};
  public navigationExtras: any;
  public Clist = {};
  public Quotationlistdata = {};
  public visitlist = {};
  public CompetitorTypelist = {};
  public Cust_Name;
  public Customer_Contact_No;
  public Enquiry_Source_Name;
  public Enquiry_Type_Name;
  public Opportunity_Name;
  public Start_Date;
  public Expected_Value;
  public Chance_Of_Success;
  public Sales_Phase;
  public Closed_Date;
  public Status;
  public Forecast;
  public custId: number;
  public OpportunityId: number;
  public OpporProdlist = {};
  public Competitorlist = {};
  public Complist = {};
  public visitTypelist = {};
  public productlist: any;
  public PKQuotationId: number;
  public Rangelist = {};
  public SubRangelist = {};
  public ProductDetailslist = {};
  public SubRange;
  public Range;
  constructor(
     private authenticationservice: Opportunities,
     private router: Router,
     private formBuilder: FormBuilder, ) { }

  ngOnInit() {
          this.authenticationservice.GetOpportunitiesList()
                    .subscribe(
                      data =>  {
                        this.opportunitieslistdata = data;
                          console.log(this.opportunitieslistdata);
                      },
                      error => {
                          alert('Invalid User');
                      });

              this.addCompetitorForm = this.formBuilder.group({
                CompetitorTypeId: ['', ''],
                CompetitorId: ['', ''],
                IsMain: ['', ''],
                CompProduct: ['', ''],
                CompPrice: ['', ''],

                VisitType: ['', ''],
                Visit_Start_Date: ['', ''],
                Visit_Start_Time: ['', ''],
                Visit_End_Date: ['', ''],
                Visit_End_Time: ['', ''],
              });
              this.CompetitorTypeDetails();
              this.Get_Visit_Type_List();
              this.Get_Range_List();

              $('#Visit_Start_Date').datepicker({
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
            $('#Visit_End_Date').datepicker({
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
                (ev.viewMode == 'days') ? $(this).datepicker('hide') : '';
                var dateData = $(this).val();
                $(this).value = dateData;
            });
            var input1 = $('#Visit_Start_Time');
            input1.clockpicker({
                autoclose: true
            });
            var input2 = $('#Visit_End_Time');
            input2.clockpicker({
                autoclose: true
            });
  }
  get f() { return this.addCompetitorForm.controls; }
  Get_Opportunity_Details(item) {
      $('#OpenOpporModal').modal('show');
    let PK_Opportunity_Id = item.PK_Opportunity_Id;
    this.authenticationservice.UpdateopportunityDetails(PK_Opportunity_Id)
    .subscribe( data => {
      this.Customerlist = data;
      this.Cust_Name = this.Customerlist[0].Cust_Name,
      this.Customer_Contact_No = this.Customerlist[0].Customer_Contact_No,
      this.Enquiry_Source_Name = this.Customerlist[0].Enquiry_Source_Name,
      this.Enquiry_Type_Name = this.Customerlist[0].Enquiry_Type_Name,
      this.Opportunity_Name = this.Customerlist[0].Opportunity_Name,
      this.Start_Date = this.Customerlist[0].Start_Date,
      this.Expected_Value = this.Customerlist[0].Expected_Value,
      this.Chance_Of_Success = this.Customerlist[0].Chance_Of_Success,
      this.Sales_Phase = this.Customerlist[0].Sales_Phase,
      this.Closed_Date = this.Customerlist[0].Closed_Date,
      this.Status = this.Customerlist[0].Status,
      this.Forecast = this.Customerlist[0].Forecast,
      this.custId = this.Customerlist[0].PK_Cust_Id;
      this.OpportunityId = this.Customerlist[0].PK_Opportunity_Id;
     // console.log(this.Customerlist);
    });
  }
  Get_ContactPerson_Details() {
        this.authenticationservice.Get_ContactPerson_Details(this.custId)
        .subscribe( data => {
          this.ContactPersonlist = data;
        });
  }
  //Add Document
  Get_Document_List() {
    this.authenticationservice.Get_Document_List(this.OpportunityId)
    .subscribe( data => {
      this.Documentlist = data;
    });
  }
  Add_Document() {
    alert('Add_');
    let body = {
      FK_Opportunity_Id: this.OpportunityId,
      Path1: ''
    };
    this.authenticationservice.Add_Document(body)
    .subscribe( data => {
      alert('Document save successfully');
      this.Get_Document_List();
        },
        error => {
          console.log(JSON.stringify(error));
          alert('Error');
        } );
  }
  Delete_Document(item) {
    this.authenticationservice.Delete_Document(item.PK_Document_Id)
    .subscribe( data => {
      console.log(data);
    // alert(response[0].Message);
     this.Get_Document_List();
    });
  }

  // Competitor
  CompetitorTypeDetails() {
    this.authenticationservice.Get_Competitor_Type_List()
    .pipe(first())
    .subscribe( data => {
      this.CompetitorTypelist = data;
    });
  }
  Get_Competitor_List(e) {
    this.authenticationservice.Get_Competitor_List(e.target.value)
   .pipe(first())
   .subscribe( data => {
     this.Complist = data;
    });
  }
  Get_OpportunityCompetitorDetails(){
    this.authenticationservice.Get_OpportunityCompetitorDetails(this.OpportunityId)
    .subscribe( data => {
      this.Clist = data;
      console.log(this.Clist);
    });
  }
  AddCompetitor() {
    if (this.f.CompetitorTypeId.value === '') {
      alert('Please select competitor type');
     return false;
    }
    if (this.f.CompetitorId.value === '') {
      alert('Please select competitor');
     return false;
    }
    if (this.f.CompProduct.value === '') {
      alert('Please select Product');
     return false;
    }

  let body = {
    FK_Competitor_Type_Id: this.f.CompetitorTypeId.value,
    FK_Competitor_Id: this.f.CompetitorId.value ,
    Is_Main: this.f.IsMain.value,
    Comp_Product: this.f.CompProduct.value,
    Comp_Price: this.f.CompPrice.value,
    FK_Opportunity_Id: this.OpportunityId
  };
  this.authenticationservice.AddCompetitor(body)
  .subscribe( data => {
    alert('Competitor save successfully');
    this.Get_OpportunityCompetitorDetails();
    this.addCompetitorForm.get('CompetitorTypeId').setValue('');
    this.addCompetitorForm.get('CompetitorId').setValue('');
    this.addCompetitorForm.get('IsMain').setValue('');
    this.addCompetitorForm.get('CompProduct').setValue('');
    this.addCompetitorForm.get('CompPrice').setValue('');
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
      } );
  }
  Delete_Competitor(item) {
    this.authenticationservice.Delete_Competitor(item.PK_Competitor_Id)
    .subscribe( data => {
      alert('Delete Competitor');
      this.Get_OpportunityCompetitorDetails();
    });
  }
  // Quotation
  Get_Quotation_List() {
    this.authenticationservice.Get_Quotation_List(this.OpportunityId)
    .subscribe( data => {
      this.Quotationlistdata = data;
      console.log(this.Quotationlistdata);
    });
  }
  Add_Quotation() {
    alert('Add_Quotation');
    let body = {
      FK_Opportunity_Id: this.OpportunityId,
      Path1: 'pmnh.png'
    };
    this.authenticationservice.Add_Quotation(body)
    .subscribe( data => {
      alert('Quotation save successfully');
      this.Get_Document_List();
        },
        error => {
          console.log(JSON.stringify(error));
          alert('Error');
        } );
  }
  Delete_Quotation(item) {
    this.authenticationservice.Delete_Quotation(item.PK_Quotation_Id)
    .subscribe( data => {
         this.Get_Quotation_List();
    });
  }

  // Visit
  Get_OpportunityVisitDetails(){
    this.authenticationservice.Get_OpportunityVisitDetails(this.OpportunityId)
    .subscribe( data => {
      this.visitlist = data;
      console.log(this.visitlist);
    });
  }
  Get_Visit_Type_List() {
    this.authenticationservice.Get_Visit_Type_List()
    .pipe(first())
    .subscribe( data => {
      this.visitTypelist = data;
    });
    }
  AddVisits() {
  if (this.f.VisitType.value === '') {
    alert('Please select Visit type');
   return false;
  }
  if ($('#Visit_Start_Date').val() === '') {
    alert('Please select Start Date');
   return false;
  }
  if ($('#Visit_Start_Time').val() === '') {
    alert('Please select Start Time');
   return false;
  }
  if ($('#Visit_End_Date').val() === '') {
    alert('Please select End Date');
   return false;
  }
  if ($('#Visit_End_Time').val() === '') {
    alert('Please select End Time');
   return false;
  }
let body = {
  FK_Visit_Type_Id: this.f.VisitType.value,
  List_Visit_Start_Date: $('#Visit_Start_Date').val(),
  List_Visit_Start_Time: $('#Visit_Start_Time').val(),
  List_Visit_End_Date: $('#Visit_End_Date').val(),
  List_Visit_End_Time: $('#Visit_End_Time').val(),
  FK_Opportunity_Id: this.OpportunityId
};
this.authenticationservice.AddVisits(body)
.subscribe( data => {
  alert('Competitor save successfully');
  this.Get_OpportunityVisitDetails();
    },
    error => {
      console.log(JSON.stringify(error));
      alert('Error');
    } );
  }
  DeleteVisits(item) {
    this.authenticationservice.DeleteVisits(item.PK_Visit)
    .subscribe( data => {
         this.Get_OpportunityVisitDetails();
    });
  }
  //Product
  Get_Oppor_Prod() {
    this.authenticationservice.Get_Oppor_Prod(this.OpportunityId)
    .subscribe( data => {
      this.productlist = data;
      console.log(this.productlist);
    });
  }
  Get_Range_List() {
    this.authenticationservice.Get_Range_List()
    .pipe(first())
    .subscribe( data => {
      this.Rangelist = data;
      console.log(this.Rangelist);
    });
  }
  Get_Sub_Range_List(e) {
      this.authenticationservice.Get_Sub_Range_List(e.target.value)
      .pipe(first())
      .subscribe( data => {
        this.SubRangelist = data;
        console.log(this.SubRangelist);
      });
  }
  Get_Product_List(e) {
    this.SubRange = $('#SubRange option:selected').text();
    this.Range = $('#Range option:selected').text();
    this.authenticationservice.Get_Product_List(e.target.value)
    .pipe(first())
    .subscribe( data => {
      this.ProductDetailslist = data;
      console.log(this.ProductDetailslist);
    });
  }
  Add_opporProduct() {
    // if ($('#Range').val() =='') {
    //   alert('Please select Range');
    //   return false;
    // }
    // if ($('#SubRange').val() =='') {
    //   alert('Please select Sub Range');
    // return false;
    // }
  var selected = [];
              for ( let i in this.ProductDetailslist)
              {
                if ($('#' + this.ProductDetailslist[i].Product_Id).is(':checked') === true )
                {
                  let data = {
                    Product_Id: this.ProductDetailslist[i].Product_Id,
                    Price: this.ProductDetailslist[i].Price,
                    Quantity: this.ProductDetailslist[i].Quantity
                  }
      selected.push(data);
    }
  }
alert(JSON.stringify(selected));
let body = {
  FK_Range_Id: $('#Range').val(),
  FK_Sub_Range_Id: $('#SubRange').val(),
  FK_Opportunity_Id: this.OpportunityId,
  ProductBO : selected,
};
this.authenticationservice.Add_opporProduct(body)
.subscribe( data => {
  alert(' save successfully');
    },
    error => {
      console.log(JSON.stringify(error));
      alert('Error');
    } );
  }
}

