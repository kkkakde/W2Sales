import { Component, OnInit } from '@angular/core';
import { Opportunities } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Alert } from 'selenium-webdriver';
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
  public opportunitieslistdata: any;
  public Customerlist: any;
  public ContactPersonlist: any;
  public Documentlist: any;
  public navigationExtras: any;
  public Clist: any;
  public Quotationlistdata: any;
  public visitlist : any;
  public CompetitorTypelist : any;
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
  public OpporProdlist: any;
  public Competitorlist: any;
  public Complist: any;
  public visitTypelist: any;
  public productlist: any;
  public PKQuotationId: number;
  public Rangelist: any;
  public SubRangelist: any;
  public ProductDetailslist: any;
  public SubRange;
  public Range;
  public CName;
  public customerN;
  public Reasonlist;
  public session: any;
  public editedvisit = false;
  public PN: string;
  public ProductName: string;
  public PNAction;
  public LostPN;
  public PK_Opp_Id;
  public IntimeFlag: boolean;
  public attchment: File;
  constructor(
    private authenticationservice: Opportunities,
    private router: Router,
    private formBuilder: FormBuilder, ) { }
    key: string = 'name'; // set default
    reverse:boolean = false;
    sort(key) {
      this.key = key;
      this.reverse = !this.reverse;
    };
  ngOnInit() {
    this.IntimeFlag = true;
    localStorage.setItem('Quotationducument', '');
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.GetOpportunityList();
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
      Range: ['', ''],
      SubRange: ['', ''],
      QT: ['', ''],
      PT: ['', ''],
      chk_prod: ['', ''],
      ProductName: ['', ''],
      Won_Value: ['', ''],
      Won_Remarks: ['', ''],
      // Product_Name: ['', ''],
      // Cust_Name: ['', ''],
      Lost_Remarks: ['', ''],
      Competitor_Name: ['', ''],
      Lost_Value: ['', ''],
      // PName: ['', ''],
      Reason: ['', ''],
      Stop_Remarks: ['', ''],
      InProcess_Remarks: ['', '']
    });
    this.CompetitorTypeDetails();
    this.Get_Visit_Type_List();
    this.Get_Range_List();
    $('#Visit_Start_Date').datepicker({
      showAnim: 'fadeIn',
      format: 'dd-M-yyyy',
      startDate: '+1d',
      setDate: new Date(),
      // endDate: '+' + $("#maxdate").val() + 'd',
      // endDate: '+30d',
      defaultDate: new Date(), autoclose: true
    }).on('changeDate', function (ev) {
      (ev.viewMode === 'days') ? $(this).datepicker('hide') : '';
      var dateData = $(this).val();
      $(this).value = dateData;
      $('#Visit_End_Date').val('').removeAttr('disabled');
      $('#Visit_End_Date').datepicker('remove');
      $('#Visit_End_Date').datepicker({ showAnim: 'fadeIn', format: 'd-M-yyyy', startDate: $('#Visit_Start_Date').val(), clearBtn: true, autoclose: true });
    });
    $('#Visit_End_Date').datepicker({
      showAnim: 'fadeIn',
      format: 'dd-M-yyyy',
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
      (ev.viewMode === 'days') ? $(this).datepicker('hide') : '';
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
  onpopupload() {
      this.authenticationservice.UpdateopportunityDetails(this.PK_Opp_Id)
      .subscribe(data => {
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
      });

  }
  Get_Opportunity_Details(item) {
    this.PK_Opp_Id= item.PK_Opportunity_Id;
    $('#OpenOpporModal').modal({backdrop: false, keyboard: false, show: true});
    this.authenticationservice.UpdateopportunityDetails(item.PK_Opportunity_Id)
      .subscribe(data => {
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
      });
  }
  Get_ContactPerson_Details() {
    this.authenticationservice.Get_ContactPerson_Details(this.custId)
      .subscribe(data => {
        this.ContactPersonlist = data;
      });
  }
  // Competitor
  CompetitorTypeDetails() {
    this.authenticationservice.Get_Competitor_Type_List()
      .pipe(first())
      .subscribe(data => {
        this.CompetitorTypelist = data;
      });
  }
  Get_Competitor_List(e) {
    this.authenticationservice.Get_Competitor_List(e.target.value)
      .pipe(first())
      .subscribe(data => {
        this.Complist = data;
      });
  }
  Get_OpportunityCompetitorDetails() {
    this.authenticationservice.Get_OpportunityCompetitorDetails(this.OpportunityId)
      .subscribe(data => {
        this.customerN = this.Cust_Name;
        this.Clist = data;
        this.addCompetitorForm.get('Lost_Value').setValue('');
        this.addCompetitorForm.get('Competitor_Name').setValue('');
        this.addCompetitorForm.get('Lost_Remarks').setValue('');
      });
  }
  AddCompetitor() {
    if (this.f.CompetitorTypeId.value === '') {
      return;
    }
    if (this.f.CompetitorId.value === '') {
      return;
    }
    if (this.f.CompProduct.value === '') {
      return;
    }

    let body = {
      FK_Competitor_Type_Id: this.f.CompetitorTypeId.value,
      FK_Competitor_Id: this.f.CompetitorId.value,
      Is_Main: this.f.IsMain.value,
      Comp_Product: this.f.CompProduct.value,
      Comp_Price: this.f.CompPrice.value,
      FK_Opportunity_Id: this.OpportunityId
    };
    this.authenticationservice.AddCompetitor(body)
      .subscribe(data => {
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
      });
  }
  Delete_Competitor(item) {
    this.authenticationservice.Delete_Competitor(item.PK_Competitor_Id)
      .subscribe(data => {
        alert('Delete Competitor');
        this.Get_OpportunityCompetitorDetails();
      });
  }
  // Quotation
  Get_Quotation_List() {
    this.authenticationservice.Get_Quotation_List(this.OpportunityId)
      .subscribe(data => {
        this.Quotationlistdata = data;
        console.log(this.Quotationlistdata);
      });
  }
  onSelectAttachment(val: any) {
    console.log(val);
    this.attchment = val.target.files[0];
  }
  Add_Quotation() {
    var body = {
      file: this.attchment,
      OpportunityId: this.OpportunityId
    };
    this.authenticationservice.UploadQuotation(body)
      .subscribe(data => {
       this.Get_Quotation_List();
      },
      error => {
        console.log(JSON.stringify(error));
        alert(error);
      });
  }
  Delete_Quotation(item) {
    this.authenticationservice.Delete_Quotation(item.PK_Quotation_Id)
      .subscribe(data => {
        this.Get_Quotation_List();
      });
  }
  // Visit
  Get_OpportunityVisitDetails() {
    this.authenticationservice.Get_OpportunityVisitDetails(this.OpportunityId)
      .subscribe(data => {
        this.visitlist = data;
      });
  }
  Get_Visit_Type_List() {
    this.authenticationservice.Get_Visit_Type_List()
      .pipe(first())
      .subscribe(data => {
        this.visitTypelist = data;
      });
  }
  AddVisits() {
    if (this.f.VisitType.value === '') {
      return;
    }
    if ($('#Visit_Start_Date').val() === '') {
      return;
    }
    if ($('#Visit_Start_Time').val() === '') {
      return;
    }
    if ($('#Visit_End_Date').val() === '') {
      return;
    }
    if ($('#Visit_End_Time').val() === '') {
      return;
    }
    let body = {
      FK_Visit_Type_Id: this.f.VisitType.value,
      List_Visit_Start_Date: $('#Visit_Start_Date').val(),
      List_Visit_Start_Time: $('#Visit_Start_Time').val(),
      List_Visit_End_Date: $('#Visit_End_Date').val(),
      List_Visit_End_Time: $('#Visit_End_Time').val(),
      FK_Opportunity_Id: this.OpportunityId,
      Created_By: this.session.session.PK_Resource_Id
    };
    this.authenticationservice.AddVisits(body)
      .subscribe(data => {
        alert('Visit saved successfully');
        this.Get_OpportunityVisitDetails();
        this.addCompetitorForm.get('VisitType').setValue('');
        this.addCompetitorForm.get('Visit_Start_Date').setValue('');
        this.addCompetitorForm.get('Visit_Start_Time').setValue('');
        this.addCompetitorForm.get('Visit_End_Date').setValue('');
        this.addCompetitorForm.get('Visit_End_Time').setValue('');
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
      });
  }
  DeleteVisits(item) {
    this.authenticationservice.DeleteVisits(item.PK_Visit)
      .subscribe(data => {
        this.Get_OpportunityVisitDetails();
      });
  }
  // Product
  Get_Oppor_Prod() {
    this.authenticationservice.Get_Oppor_Prod(this.OpportunityId)
      .subscribe(data => {
        this.productlist = data;
        var x = '';
        for (let i = 0; i < this.productlist.length; i++) {
          if (x != '') {
            x = x + ', ';
          }
          x = x + this.productlist[i].Product_Name;
        }
        this.PNAction = x;
        this.addCompetitorForm.get('InProcess_Remarks').setValue('');
        this.ProductDetailslist = null;
        this.SubRange = null;
        this.Range = null;
        this.addCompetitorForm.get('Range').setValue('');
        this.addCompetitorForm.get('SubRange').setValue('');
        this.CName = this.Cust_Name;
        this.addCompetitorForm.get('Won_Value').setValue('');
        this.addCompetitorForm.get('Won_Remarks').setValue('');

      });
  }
  Get_Range_List() {
    this.authenticationservice.Get_Range_List()
      .pipe(first())
      .subscribe(data => {
        this.Rangelist = data;
      });
  }
  Get_Sub_Range_List(e) {
    this.authenticationservice.Get_Sub_Range_List(e.target.value)
      .pipe(first())
      .subscribe(data => {
        this.SubRangelist = data;
      });
  }
  Get_Product_List(e) {
    this.SubRange = $('#SubRange option:selected').text();
    this.Range = $('#Range option:selected').text();
    this.authenticationservice.Get_Product_List(e.target.value)
      .pipe(first())
      .subscribe(data => {
        this.ProductDetailslist = data;
      });
  }
  Add_opporProduct() {
    if ($('#Range').val() === null) {
      return;
    }
    if ($('#SubRange').val() === null) {
      return;
    }
    let selected = [];
    for (let i in this.ProductDetailslist) {
      if ($('#' + this.ProductDetailslist[i].Product_Id).is(':checked') === true) {
        let data = {
          Product_Id: this.ProductDetailslist[i].Product_Id,
          Quantity: $('#' + this.ProductDetailslist[i].Product_Id + 'QR').val(),
          Price: $('#' + this.ProductDetailslist[i].Product_Id + 'PR').val(),
          ISCHECKED: $('#' + this.ProductDetailslist[i].Product_Id).is(':checked')
        };
        selected.push(data);
      }
    }
    if (selected.length < 1) {
      alert('Please check atleast one record');
      return false;
    }
    let body = {
      FK_Range_Id: $('#Range').val(),
      FK_Sub_Range_Id: $('#SubRange').val(),
      FK_Opportunity_Id: this.OpportunityId,
      'ProductBO': selected,
      Created_By: this.session.session.PK_Resource_Id
    };
    this.authenticationservice.Add_opporProduct(body)
      .subscribe(data => {
        alert('save successfully');
        this.Get_Oppor_Prod();
        this.addCompetitorForm.get('Range').setValue('');
        this.addCompetitorForm.get('SubRange').setValue('');
        this.addCompetitorForm.get('QT').setValue('');
        this.addCompetitorForm.get('PT').setValue('');
        this.addCompetitorForm.get('chk_prod').setValue('');
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
      });
  }
  Add_InProcess() {
    this.submitted = true;
    if (this.f.InProcess_Remarks.value === '') {
      return;
    }
    let body = {
      InProcess_Remarks: this.f.InProcess_Remarks.value,
      PK_Opportunity_Id: this.OpportunityId
    };
    this.authenticationservice.Add_InProc(body)
      .subscribe(data => {
        alert('save successfully');
        this.addCompetitorForm.get('InProcess_Remarks').setValue('');
        this.onpopupload();
        $('#InProcessModel').modal('hide');
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
      });
  }
  Clear_InProcess() {
    this.addCompetitorForm.get('InProcess_Remarks').setValue('');
  }
  Add_Won() {
    this.submitted = true;
    if (this.f.Won_Value.value === '' || this.f.Won_Remarks.value === '') {
    alert('Enter value.')
      return;
    }
    let body = {
      Won_Value: this.f.Won_Value.value,
      Won_Remarks: this.f.Won_Remarks.value,
      PK_Opportunity_Id: this.OpportunityId
    };
    this.authenticationservice.Add_Won(body)
      .subscribe(data => {
        alert('save successfully');
        // this.onCloseActionload();
        this.onpopupload();
        this.addCompetitorForm.get('Won_Value').setValue('');
        this.addCompetitorForm.get('Won_Remarks').setValue('');
        $('#WonModal').modal('hide');
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
      });
  }
  Clear_Won() {
    this.addCompetitorForm.get('Won_Value').setValue('');
    this.addCompetitorForm.get('Won_Remarks').setValue('');
  }
  Add_Lost() {
    this.submitted = true;
    if (this.f.Lost_Value.value === '' || this.f.Competitor_Name.value === '' || this.f.Lost_Remarks.value === '') {
    alert('Enter Value');
      return;
    }
    let body = {
      Lost_Value: this.f.Lost_Value.value,
      FK_Lost_Competitor_Id: this.f.Competitor_Name.value,
      Lost_Remarks: this.f.Lost_Remarks.value,
      PK_Opportunity_Id: this.OpportunityId
    };
    this.authenticationservice.Add_Lost(body)
      .subscribe(data => {
        alert('save successfully');
        this.onpopupload();
        this.addCompetitorForm.get('Lost_Value').setValue('');
        this.addCompetitorForm.get('Competitor_Name').setValue('');
        this.addCompetitorForm.get('Lost_Remarks').setValue('');
        $('#LostModal').modal('hide');
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
      });
  }
  Clear_Lost() {
    this.addCompetitorForm.get('Lost_Value').setValue('');
    this.addCompetitorForm.get('Competitor_Name').setValue('');
    this.addCompetitorForm.get('Lost_Remarks').setValue('');
  }
  Get_Reason_List() {
    this.authenticationservice.Get_Reason_List()
      .subscribe(data => {
        this.Reasonlist = data;
        this.Get_OpportunityCompetitorDetails();
        this.addCompetitorForm.get('Reason').setValue('');
        this.addCompetitorForm.get('Competitor_Name').setValue('');
        this.addCompetitorForm.get('Stop_Remarks').setValue('');
      });
  }
  Add_Stop() {
    this.submitted = true;
    if (this.f.Reason.value === '' || this.f.Competitor_Name.value === ''
       || this.f.Competitor_Name.value === '' || this.f.Competitor_Name.value === ''
       || this.f.Stop_Remarks.value === '' ) {
      alert('Enter value.');
      return;
    }
    let body = {
      FK_Stop_Reason: this.f.Reason.value,
      FK_Stop_Competitor_Id: this.f.Competitor_Name.value,
      Stop_Remarks: this.f.Stop_Remarks.value,
      PK_Opportunity_Id: this.OpportunityId
    };
    this.authenticationservice.Add_Stop(body)
      .subscribe(data => {
        alert('save successfully');

        this.onpopupload();
        this.addCompetitorForm.get('Reason').setValue('');
        this.addCompetitorForm.get('Competitor_Name').setValue('');
        this.addCompetitorForm.get('Stop_Remarks').setValue('');
        $('#StopModal').modal('hide');
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
      });
  }
  Clear_Stopped() {
    this.addCompetitorForm.get('Reason').setValue('');
    this.addCompetitorForm.get('Competitor_Name').setValue('');
    this.addCompetitorForm.get('Stop_Remarks').setValue('');
  }
  GetOpportunityList() {
    var body={
      Created_By: this.session.session.PK_Resource_Id

    };
    this.authenticationservice.GetOpportunitiesList(body)
      .subscribe(
      data => {
        this.opportunitieslistdata = data;
      },
      error => {
        alert('Invalid User');
      });

  }
  outVisit(item) {
    this.IntimeFlag = true;
    var body = {
      PK_Cust_Id: item.PK_Cust_Id,
      FK_Opportunity_Id: item.PK_Opportunity_Id,
      Action: 'OpportunityOut',
      Created_By: this.session.session.PK_Resource_Id,
      Visit_Tracking_Id: item.Visit_Tracking_Id,
    };
    this.authenticationservice.VisitOut(body)
      .subscribe(
      data => {
        this.GetOpportunityList();
      },
      error => {
        alert('Invalid User');
      });
  }
  inVisit(item) {
    this.IntimeFlag = false;
    var body = {
      PK_Cust_Id: item.PK_Cust_Id,
      FK_Opportunity_Id: item.PK_Opportunity_Id,
      Action: 'OpportunityIn',
      Created_By: this.session.session.PK_Resource_Id,
      Visit_Tracking_Id: item.Visit_Tracking_Id,
    };
    this.authenticationservice.VisitOut(body)
      .subscribe(
      data => {
        this.GetOpportunityList();
      },
      error => {
        alert('Invalid User');
      });
  }
}

