import { Component, OnInit } from '@angular/core';
import { Opportunities } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first, isEmpty } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Alert, Session } from 'selenium-webdriver';
import { and } from '@angular/router/src/utils/collection';
import { empty } from 'rxjs';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-opportunitieslist',
  templateUrl: './opportunitieslist.component.html',
  styleUrls: ['./opportunitieslist.component.css']
})
export class OpportunitieslistComponent implements OnInit {
  page: number ;
  filter: any;
  totalRec: number;
  addCompetitorForm: FormGroup;
  submitted = false;
  public loading;
  public filename: any;
  public wonbody: {
      Value: any,
      Remarks: any,
      PK_Opportunity_Id: number,
      Ordervalue: any,
      Reason: any,
      BetterOrder: any,
      Competitor_Id: number,
      filename: any;
  };
  public customerEmailId;
  public Vlist: any;
  public ASMVisitlist: any;
  public EmailIdASM ;
  public ASMName;
  public opportunitieslistdata: any;
  public Customerlist: any;
  public ContactPersonlist: any;
  public Documentlist: any;
  public navigationExtras: any;
  public Clist: any;
  public Quotationlistdata: any;
  public visitlist: any;
  public CompetitorTypelist: any;
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
  public DataList: any;
  public radflag;
  public ResultMsg = false;
  public attchmentWon: File;
  public UFileName: any;
  constructor(
    private authenticationservice: Opportunities,
    private router: Router,
    private formBuilder: FormBuilder, ) { }
    key: string = 'name'; // set default
    reverse:boolean = false;
    sort(key) {
      this.key = key;
      this.reverse = !this.reverse;
    }
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
      Lost_Remarks: ['', ''],
      Competitor_Name: ['', ''],
      Lost_Value: ['', ''],
      Reason: ['', ''],
      Stop_Remarks: ['', ''],
      ordervalue: ['', ''],
      questionTest1: ['', ''],
      ReasonWon: ['', ''],
      betterorderwon: ['', ''],
      ReasonLost: ['', ''],
      BetterLost: ['', ''],
      LostFeedback: ['', ''],
      ModelNo: ['', ''],
      SerialNo: ['', ''],
      ASM_Name: ['' , '']
    });
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

    $('#subrange1').hide();
    $('#btnstatus').hide();
    $('#btnMoveLeftTab').hide();

    $('#btnMoveRightTab').click(function() {
    $('.nav-tabs > .active').next('li').find('a').trigger('click');
    });

    $('#btnMoveLeftTab').click(function() {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    });

    $('#btnMoveRightTab').click(function() {
      var tid = $('.nav-tabs > .active a').attr('id');
      if (tid === 'Quotation1') {
        $('#btnstatus').show();
        $(this).hide();
        $('#btnMoveLeftTab').show();
      }
      $('#btnMoveLeftTab').show();
    });
    $('#btnMoveLeftTab').click(function() {
      $('#btnMoveRightTab').show();
      $('#btnstatus').hide();
      var tid = $('.nav-tabs > .active a').attr('id');
      if (tid === 'Overviewid') {
        $('#btnMoveLeftTab').hide();
      }
    });
    $(document).ready(function() {
      var text_max = 1000;
      $('.yes textarea').attr('maxlength', '1000');
      $('.yes textarea').keyup(function() {
          var text_length = $('.yes textarea').val().length;
          var text_remaining = text_max - text_length;
          $('.yes textarea + span').html(text_remaining + ' characters remaining');
      });

      $('.no textarea').attr('maxlength', '1000');
      $('.no textarea').keyup(function() {
          var text_length = $('.no textarea').val().length;
          var text_remaining = text_max - text_length;
          $('.no textarea + span').html(text_remaining + ' characters remaining');
      });

      $('.lostans textarea').attr('maxlength', '1000');
      $('.lostans textarea').keyup(function() {
          var text_length = $('.lostans textarea').val().length;
          var text_remaining = text_max - text_length;
          $('.lostans textarea + span').html(text_remaining + ' characters remaining');
      });

      $('.WonQuestions input[type="radio"]').click(function() {
        var inputValue = $(this).attr("value");
        var targetBox = $("." + inputValue);
        $(".qans").not(targetBox).hide();
        $(targetBox).show();
    });
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
    $('#OpenOpporModal').modal({backdrop: false, keyboard: false, show: true});
    this.authenticationservice.UpdateopportunityDetails(item.PK_Opportunity_Id)
      .subscribe(data => {
        this.DataList = data;
          this.Customerlist = this.DataList.overView;
          this.ContactPersonlist = this.DataList.ContactPerson;
          this.customerEmailId = this.ContactPersonlist[0].Cust_CntctPrson_Email_Id;
          this.Clist = this.DataList.Competitor;
          this.productlist = this.DataList.Product;
          this.Quotationlistdata = this.DataList.Quotation;
          this.Cust_Name = this.Customerlist[0].Cust_Name,
          this.Customer_Contact_No = this.Customerlist[0].Customer_Contact_No,
          this.Enquiry_Source_Name = this.Customerlist[0].Enquiry_Source_Name,
          this.Enquiry_Type_Name = this.Customerlist[0].Enquiry_Type_Name,
          this.Opportunity_Name = this.Customerlist[0].Opportunity_Name,
          // this.Start_Date = this.Customerlist[0].Start_Date,
          this.Expected_Value = this.Customerlist[0].Expected_Value,
          this.Chance_Of_Success = this.Customerlist[0].Chance_Of_Success,
          this.Sales_Phase = this.Customerlist[0].Sales_Phase,
          this.Closed_Date = this.Customerlist[0].Closed_Date,
          // this.Status = this.Customerlist[0].Status,
          this.Forecast = this.Customerlist[0].Forecast,
          this.custId = this.Customerlist[0].PK_Cust_Id;
          this.OpportunityId = this.Customerlist[0].PK_Opportunity_Id;
      });
     // Competitor Type Dropdown
        // this.authenticationservice.Get_Competitor_Type_List()
        // .pipe(first())
        //  .subscribe(data => {
        //   this.CompetitorTypelist = data; });
      // Competitor Dropdown
        this.authenticationservice.Get_Competitor_List('GBL')
        .pipe(first())
        .subscribe(data => {
          this.Complist = data; });
    // Visit Type Dropdown
        this.authenticationservice.Get_Visit_Type_List()
        .pipe(first())
        .subscribe(data => {
          this.visitTypelist = data;  });
    // Range Dropdown
        this.authenticationservice.Get_Range_List()
          .pipe(first())
          .subscribe(data => {
          this.Rangelist = data; });
  }
  // Competitor
  // Get_ContactPerson_Details() {
  //   this.authenticationservice.Get_ContactPerson_Details(this.custId)
  //     .subscribe(data => {
  //       this.ContactPersonlist = data;
  //     });
  // }
  Get_OpportunityCompetitorDetails() {
    this.authenticationservice.Get_OpportunityCompetitorDetails(this.OpportunityId)
      .subscribe(data => {
        this.Clist = data;
        this.addCompetitorForm.get('Lost_Value').setValue('');
        this.addCompetitorForm.get('Competitor_Name').setValue('');
        this.addCompetitorForm.get('Lost_Remarks').setValue('');
        this.addCompetitorForm.get('BetterLost').setValue('');
        this.onpopupload();
      });
  }
  AddCompetitor() {
    if (this.f.CompetitorId.value === '') {
      return;
    }
    if (this.f.CompProduct.value === '') {
      return;
    }
    this.loading = true;
    let body = {
      FK_Competitor_Type_Id: 'GBL',
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
        this.addCompetitorForm.get('CompetitorId').setValue('');
        this.addCompetitorForm.get('IsMain').setValue('');
        this.addCompetitorForm.get('CompProduct').setValue('');
        this.addCompetitorForm.get('CompPrice').setValue('');
        this.loading = false;
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
        this.loading = false;
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
    this.loading = true;
    if (this.attchment === null || this.attchment === undefined) {
      alert ('please select file first ');
      this.loading = false;
      return false;
      }
    var body = {
      file: this.attchment,
      OpportunityId: this.OpportunityId
    };
    this.authenticationservice.UploadQuotation(body)
      .subscribe(data => {
       this.Get_Quotation_List();
       this.loading = false;
      },
      error => {
        console.log(JSON.stringify(error));
        alert(error);
        this.loading = false;
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
    let body = {
      FK_Opportunity_Id: this.OpportunityId,
      PK_Resource_Id: this.session.session.PK_Resource_Id
    };
    this.authenticationservice.Get_OpportunityVisitDetails(body)
      .subscribe(data => {
        this.Vlist = data;
        this.visitlist = this.Vlist.visitListData;
        this.ASMVisitlist = this.Vlist.asmData;
        this.EmailIdASM = this.ASMVisitlist[0].ASMEmailId;
        this.ASMName = this.ASMVisitlist[0].ASMName;
      });
  }
  AddVisits() {
    this.loading = true;
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
      Created_By: this.session.session.PK_Resource_Id,
      AreaManagerId: this.f.ASM_Name.value,
      ASMEmailId: this.EmailIdASM,
      ASMName: this.ASMName,
      SalesEngineerName: this.session.session.Resource_Name,
    };
    this.authenticationservice.AddVisits(body)
      .subscribe(data => {
        alert('Visit saved successfully');
        this.loading = false;
        this.Get_OpportunityVisitDetails();
        this.addCompetitorForm.get('VisitType').setValue('');
        this.addCompetitorForm.get('Visit_Start_Date').setValue('');
        this.addCompetitorForm.get('Visit_Start_Time').setValue('');
        this.addCompetitorForm.get('Visit_End_Date').setValue('');
        this.addCompetitorForm.get('Visit_End_Time').setValue('');
        this.addCompetitorForm.get('ASM_Name').setValue('');
        $('#VisitModel').modal('hide');
        $('#OpenOpporModal').modal('hide');
        this.router.navigate(['/opportunitieslist']);
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
        this.LostPN = x;
        this.ProductDetailslist = null;
        this.SubRange = null;
        this.Range = null;
        this.addCompetitorForm.get('Range').setValue('');
        this.addCompetitorForm.get('SubRange').setValue('');
        this.CName = this.Cust_Name;
        this.f.ReasonWon.setValue('');
        this.ResultMsg = null;
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
    this.loading = true;
    let selected = [];
    for (let i in this.ProductDetailslist) {
      if ($('#' + this.ProductDetailslist[i].Product_Id).is(':checked') === true) {
        if ( $('#' + this.ProductDetailslist[i].Product_Id + 'QR').val() === '' ||
         $('#' + this.ProductDetailslist[i].Product_Id + 'PR').val() === '') {
          alert('Enter Quantity & Price');
          this.loading = false;
          return false;
        }
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
      this.loading = false;
      return false;
    }
    let body = {
      FK_Range_Id: $('#Range').val(),
      FK_Sub_Range_Id: $('#SubRange').val(),
      FK_Opportunity_Id: this.OpportunityId,
      'ProductBO': selected,
      Created_By: this.session.session.PK_Resource_Id
    };
    alert(JSON.stringify(body));
    this.authenticationservice.Add_opporProduct(body)
      .subscribe(data => {
        alert('save successfully');
        this.Get_Oppor_Prod();
        this.addCompetitorForm.get('Range').setValue('');
        this.addCompetitorForm.get('SubRange').setValue('');
        this.addCompetitorForm.get('QT').setValue('');
        this.addCompetitorForm.get('PT').setValue('');
        this.addCompetitorForm.get('chk_prod').setValue('');
        this.loading = false;
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
        this.loading = false;
      });
  }
  onSelectAttachmentWon(val: any) {
    // if (val.target.files[0].size > 200000) {
    //   alert('file size limit is maximum 2MB');
    //   $('#upload').val('');
    //   return false;
    //  }
    this.attchmentWon = val.target.files[0];
  }
  Add_attachmentWon() {
    if (this.attchmentWon === null || this.attchmentWon === undefined) {
      alert ('please attach a file');
      this.loading = false;
      return false;
      }
     let body = {
        OpportunityId: this.OpportunityId,
        file:  this.attchmentWon
        };
        this.authenticationservice.Add_attachmentwon(body)
        .subscribe(data => {
          this.filename = data;
          this.UFileName = this.filename.Response;
          alert(this.filename.Message);
        });
  }
  BtnNextWon() {
     if ($('#PNAction').val() === '') {
      alert('Add product'); return;
     }
     if (this.f.Won_Value.value === '') {
       alert('Enter Won Value');
       return;
     }
     if (this.f.ordervalue.value === '') {
       alert('Enter Order Value');
       return;
     }
     if (this.f.ReasonWon.value === '') {
       alert('Enter Reason for Won');
       return;
     }
       this.wonbody = {
         PK_Opportunity_Id: this.OpportunityId,
         Value: this.f.Won_Value.value,
         Competitor_Id: null,
         Remarks: this.f.Won_Remarks.value,
         Reason: this.f.ReasonWon.value,
         BetterOrder: this.f.betterorderwon.value,
         Ordervalue: this.f.ordervalue.value,
         filename: this.UFileName
     };
     $('#npsWon').modal('show');
  }
  Add_Won() {
    this.loading = true;
    $('#btnCancel').hide();
     if (this.f.questionTest1.value === '') {
       alert('Enter Text'); return;
     }
     let body = {
       PK_Opportunity_Id: this.OpportunityId,
       Value: this.wonbody.Value,
       Competitor_Id: null,
       Remarks: this.wonbody.Remarks,
       Reason: this.wonbody.Reason,
       BetterOrder: this.wonbody.BetterOrder,
       Ordervalue: this.wonbody.Ordervalue,
       Feedback: this.f.questionTest1.value,
       filename: this.wonbody.filename,
       CustomerEmailId: this.customerEmailId
      };
       this.authenticationservice.Add_Won(body)
       .subscribe(data => {
         alert('Won Save');
         this.loading = false;
         $('#btnCancel').show();
         $('#npsWon').modal('hide');
         $('#WonModal').modal('hide');
         $('#OpenOpporModal').modal('hide');
         this.router.navigate(['/opportunitieslist']);
         this.addCompetitorForm.get('questionTest1').setValue('');
         this.GetOpportunityList();
       },
       error => {
        this.loading = false;
        $('#btnCancel').show();
         console.log(JSON.stringify(error));
         alert('Error');
       });
  }
  btnNextLost() {
       if ($('#LostPN').val() === '') {
         alert('Add product'); return;
       }
       if (this.f.Lost_Value.value === '') {
         alert('Enter Lost Value'); return;
       }
       if (this.f.Lost_Remarks.value === '') {
         alert('Enter Lost Remarks'); return;
       }
       if (this.f.ReasonLost.value === '' || this.f.ReasonLost.value === null) {
         alert('Select Reason for Lost'); return;
       }
       this.wonbody = {
         Value: this.f.Lost_Value.value,
         Competitor_Id: null,
         Remarks: this.f.Lost_Remarks.value,
         PK_Opportunity_Id: this.OpportunityId,
         Reason: this.f.ReasonLost.value,
         BetterOrder: this.f.BetterLost.value,
         Ordervalue: null,
         filename: null,
       };
       $('#npsLost').modal('show');
  }
  Add_Lost() {
    this.loading = true;
    $('#btnlostCancel').hide();
       if (this.f.LostFeedback.value === '') {
         alert('Enter Lost Feedback'); return;
       }
       if ($("input[name='q2ans']:checked").val() === 'yes') {
         this.radflag = 'Y';
       } else {
         this.radflag = 'N';
       }
       let body = {
         Value: this.wonbody.Value,
         Competitor_Id: this.wonbody.Competitor_Id,
         Remarks: this.wonbody.Remarks,
         PK_Opportunity_Id: this.wonbody.PK_Opportunity_Id,
         Reason: this.wonbody.Reason,
         BetterOrder: this.wonbody.BetterOrder,
         Feedback: this.f.LostFeedback.value,
         NextPurchaseFlag : this.radflag,
         CustomerEmailId: this.customerEmailId
       };
      this.authenticationservice.Add_Lost(body)
       .subscribe(data => {
         alert('Lost Save');
         this.addCompetitorForm.get('Lost_Value').setValue('');
         this.addCompetitorForm.get('Competitor_Name').setValue('');
         this.addCompetitorForm.get('Lost_Remarks').setValue('');
         this.addCompetitorForm.get('ReasonLost').setValue('');
         this.addCompetitorForm.get('BetterLost').setValue('');
         this.loading = false;
         $('#npsLost').modal('hide');
         $('#LostModal').modal('hide');
         $('#OpenOpporModal').modal('hide');
         this.router.navigate(['/opportunitieslist']);
         this.GetOpportunityList();
       },
       error => {
         console.log(JSON.stringify(error));
         this.loading = false;
         alert('Error');
       });
  }
  Add_Stop() {
    if (this.Clist.length === 0) {
       alert('Add competitor'); return;
   }
   if (this.f.Reason.value === '') {
     alert('Select Reason'); return;
   }
   if (this.f.Competitor_Name.value === '') {
     alert('Select Competitor Name'); return;
   }
   if (this.f.Stop_Remarks.value === '' ) {
     alert('Enter Stop Remarks'); return;
   }
     let body = {
       Reason: this.f.Reason.value,
       Competitor_Id: this.f.Competitor_Name.value,
       Remarks: this.f.Stop_Remarks.value,
       PK_Opportunity_Id: this.OpportunityId,
       ModelNo: this.f.ModelNo.value,
       SerialNo: this.f.SerialNo.value
     };
     this.authenticationservice.Add_Stop(body)
       .subscribe(data => {
        alert('Save Stop');
         this.onpopupload();
         this.addCompetitorForm.get('Reason').setValue('');
         this.addCompetitorForm.get('Competitor_Name').setValue('');
         this.addCompetitorForm.get('Stop_Remarks').setValue('');
         this.addCompetitorForm.get('ModelNo').setValue('');
         this.addCompetitorForm.get('SerialNo').setValue('');
         $('#StopModal').modal('hide');
         $('#OpenOpporModal').modal('hide');
         this.router.navigate(['/opportunitieslist']);
         this.GetOpportunityList();
       },
       error => {
         console.log(JSON.stringify(error));
         this.ResultMsg = false;
         alert('Error');
       });
  }
  Clear_Won() {
    this.addCompetitorForm.get('Won_Value').setValue('');
    this.addCompetitorForm.get('ordervalue').setValue('');
    this.addCompetitorForm.get('Won_Remarks').setValue('');
    this.addCompetitorForm.get('betterorderwon').setValue('');
    this.addCompetitorForm.get('ReasonWon').setValue('');
    this.addCompetitorForm.get('questionTest1').setValue('');
  }
  Clear_Lost() {
    this.addCompetitorForm.get('Lost_Value').setValue('');
    this.addCompetitorForm.get('Competitor_Name').setValue('');
    this.addCompetitorForm.get('Lost_Remarks').setValue('');
    this.addCompetitorForm.get('ReasonLost').setValue('');
    this.addCompetitorForm.get('BetterLost').setValue('');
  }
  Get_Reason_List() {
    this.ResultMsg = null;
    this.authenticationservice.Get_Reason_List()
      .subscribe(data => {
        this.Reasonlist = data;
        this.Get_OpportunityCompetitorDetails();
        this.addCompetitorForm.get('Reason').setValue('');
        this.addCompetitorForm.get('Competitor_Name').setValue('');
        this.addCompetitorForm.get('Stop_Remarks').setValue('');
      });
  }
  Clear_Stopped() {
    this.addCompetitorForm.get('Reason').setValue('');
    this.addCompetitorForm.get('Competitor_Name').setValue('');
    this.addCompetitorForm.get('Stop_Remarks').setValue('');
    this.ResultMsg = null;
  }
  GetOpportunityList() {
    var body = {
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
    const result = this.opportunitieslistdata.filter(x => x.TrackInTime === true || x.InFlag === true && x.PK_Cust_Id !== item.PK_Cust_Id);
    this.IntimeFlag = false;
    var body = {
      PK_Cust_Id: item.PK_Cust_Id,
      FK_Opportunity_Id: item.PK_Opportunity_Id,
      Action: 'OpportunityIn',
      Created_By: this.session.session.PK_Resource_Id,
      Visit_Tracking_Id: item.Visit_Tracking_Id,
    };
    if (result.length > 0 && result !== undefined ) {
      const r = confirm('are you sure you want to out !');
      if (r === true) {
      this.authenticationservice.VisitOut(body)
        .subscribe(
        data => {
          this.GetOpportunityList();
        },
        error => {
          alert('Invalid User');
        });
      }
      } else {
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
  hideNextButton() {
    $('#btnstatus').show();
    $('#btnMoveLeftTab').show();
    $('#btnMoveRightTab').hide();
  }
  hidepreButton() {
    $('#btnstatus').hide();
    $('#btnMoveLeftTab').hide();
    $('#btnMoveRightTab').show();
  }
  shownextButton() {
    $('#btnstatus').hide();
    $('#btnMoveRightTab').show();
    $('#btnMoveLeftTab').show();
  }
}
