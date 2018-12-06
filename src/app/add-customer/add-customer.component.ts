import { Component, OnInit } from '@angular/core';
import { Customer } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { environment } from '../../environments/environment';
import { error } from '@angular/compiler/src/util';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addcustomerForm: FormGroup;
  submitted = false;
  loading = false;
  public CustID: any = 0;
  public ZoneIdList: any;
  public StateIdList: any;
  public CityIdList: any;
  public IndustryIdList: any;
  public DesignationIdList: any;
  public WorkingStatusList: any;
  public CompressorRoomDetailsList: any;
  public ContactDesignationList: any;
  public ContactDetailsList: any;
  public data: any = [];
  public session: any;
  public sub: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  public attchment: File;
  public attachmenName: any;
  public updatelistdata: any;
  constructor(
    private authenticationservice: Customer,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    $('#langOpt').multiselect({
      columns: 1,
      placeholder: 'Select Industry Type',
      search: true
    });
    $('.date-own').datepicker({
      minViewMode: 2,
      format: 'yyyy',
      autoclose: true
    });

    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.addcustomerForm = this.formBuilder.group({
      Cust_Name: ['', Validators.required],
      Cust_Address_Line1: ['', Validators.required],
      Cust_Address_Line2: ['', Validators.required],
      Cust_PK_Zone_Id: ['', Validators.required],
      Cust_PK_State_Id: ['', Validators.required],
      Cust_PK_City_Id: ['', Validators.required],
      Cust_GSTN_No: ['', Validators.required],
      Cust_Cmprsd_Air_App: ['', Validators.required],
      Cust_Industry_Id: ['', ''],
      Cust_End_Product: ['', Validators.required],
      Cust_File: ['', ''],
      // });
      // this.addcustomerRoomForm = this.formBuilder.group({
      Cust_Cmprsor_Model: ['', ''],
      Cust_Cmprsor_RoomDetails: ['', ''],
      Cust_Cmprsor_Mfg_Year: ['', ''],
      Cust_Cmprsor_Commissioning_Year: ['', ''],
      Cust_Cmprsor_Status: ['', ''],
      ContactPersonName: ['', ''],
      ContactPersonContactNo: ['', ''],
      ContactPersonemail: ['', ''],
      Cust_Contact_Desigation: ['', ''],

    });
    this.getzoneList();
    this.getindustryList();
    this.GetContactPersonDesignationList();
    this.GetWorkingStatus();
    this.GetContactDesignationList();

    this.sub = this.route.queryParams.subscribe(params => {
      let CusIid = params['Id'];
      let body = {
        PK_Cust_Id: CusIid
      }
      this.authenticationservice.GetUpdateustomerList(body)
        .subscribe(
        data => {
          this.updatelistdata = data;
          this.CustID = this.updatelistdata.PK_Cust_Id;
          this.authenticationservice.GetStateList(this.updatelistdata.FK_Zone_Id.PK_Zone_Id)
            .pipe(first())
            .subscribe(statelist => {
              this.StateIdList = statelist;
            });
          this.authenticationservice.GetCityList(this.updatelistdata.FK_State_Id.PK_State_Id)
            .pipe(first())
            .subscribe(citylist => {
              this.CityIdList = citylist;
            });
          var x;
          var res;
          for (x in this.updatelistdata.CustomerIndustryTypeList) {
            if (this.updatelistdata.CustomerIndustryTypeList[x].IsSelected == 1) {
              res = res + '<option selected value=' + this.updatelistdata.CustomerIndustryTypeList[x].PK_Industry_Id + '>'
                + this.updatelistdata.CustomerIndustryTypeList[x].Industry_Name + '</option>';
            }
            else {
              res = res + '<option  value=' + this.updatelistdata.CustomerIndustryTypeList[x].PK_Industry_Id + '>'
                + this.updatelistdata.CustomerIndustryTypeList[x].Industry_Name + '</option>';
            }
          }
          $('#langOpt').html(res);
          $('#langOpt').multiselect('reload');
          this.CompressorRoomDetailsList = this.updatelistdata.Cust_CompressorRoom_List;
          this.ContactDetailsList = this.updatelistdata.Cust_Contact_Person_List;
          this.f.Cust_Name.setValue(this.updatelistdata.Cust_Name);
          this.f.Cust_Address_Line1.setValue(this.updatelistdata.Cust_Address_Line1);
          this.f.Cust_Address_Line2.setValue(this.updatelistdata.Cust_Address_Line1);
          this.f.Cust_PK_Zone_Id.setValue(this.updatelistdata.FK_Zone_Id.PK_Zone_Id);
          this.f.Cust_PK_City_Id.setValue(this.updatelistdata.FK_City_Id.PK_City_Id);
          this.f.Cust_PK_State_Id.setValue(this.updatelistdata.FK_State_Id.PK_State_Id);
          this.f.Cust_GSTN_No.setValue(this.updatelistdata.Cust_GSTN_No);
          this.f.Cust_Cmprsd_Air_App.setValue(this.updatelistdata.Cust_Cmprsd_Air_App);
          //   this.f.Cust_Industry_Id.setValue(this.updatelistdata.Cust_Industry_Id);
          this.f.Cust_End_Product.setValue(this.updatelistdata.Cust_End_Product);
        });
    });
  }
  get f() {
    return this.addcustomerForm.controls;
  }
  // get r() { return this.addcustomerRoomForm.controls; }
  getzoneList() {
    this.authenticationservice.GetZoneList()
      .pipe(first())
      .subscribe(data => {
        this.ZoneIdList = data;
      });
  }
  getstateListChange(e) {
    this.authenticationservice.GetStateList(e.target.value)
      .pipe(first())
      .subscribe(data => {
        this.StateIdList = data;
      });
  }
  getcityListChange(e) {
    this.authenticationservice.GetCityList(e.target.value)
      .pipe(first())
      .subscribe(data => {
        this.CityIdList = data;
      });
  }
  getindustryList() {
    this.authenticationservice.GetIndustryList()
      .pipe(first())
      .subscribe(data => {
        this.IndustryIdList = data;
        //  alert(JSON.stringify( this.IndustryIdList ));
        var res;
        for (var i = 0; i < this.IndustryIdList.length; i++) {
          if (this.IndustryIdList[i].IsSelected === 1) {
            res = res + '<option selected value=' + this.IndustryIdList[i].Industry_Id + '>'
              + this.IndustryIdList[i].Industry_Name + '</option>';
          }
          else {
            res = res + ' <option value=' + this.IndustryIdList[i].Industry_Id + '>'
              + this.IndustryIdList[i].Industry_Name + '</option>';
          }
        }
        $('#langOpt').html(res);
        $('#langOpt').multiselect('reload');
      });
  }
  GetContactPersonDesignationList() {
    this.authenticationservice.GetRoomDetailsList()
      .pipe(first())
      .subscribe(data => {
        this.DesignationIdList = data;
      });
  }
  GetWorkingStatus() {
    this.authenticationservice.GetWorkigStatus()
      .pipe(first())
      .subscribe(data => {
        this.WorkingStatusList = data;
      });
  }
  GetContactDesignationList() {
    this.authenticationservice.GetContactDesignationList()
      .pipe(first())
      .subscribe(data => {
        this.ContactDesignationList = data;
      });
  }
  onSubmit() {
    var Industry_Id = [];
    $.each($('#langOpt option:selected'), function () {
      Industry_Id.push($(this).val());
    });
    this.loading = true;
    this.submitted = true;
    // stop here if form is invalid
    if (this.addcustomerForm.invalid) {
      this.loading = false;
      return;
    }
    let body = {
      PK_Cust_Id: this.CustID,
      Cust_Name: this.f.Cust_Name.value,
      Cust_Address_Line1: this.f.Cust_Address_Line1.value,
      Cust_Address_Line2: this.f.Cust_Address_Line2.value,
      FK_Zone_Id: this.f.Cust_PK_Zone_Id.value,
      FK_State_Id: this.f.Cust_PK_State_Id.value,
      FK_City_Id: this.f.Cust_PK_City_Id.value,
      Cust_GSTN_No: this.f.Cust_GSTN_No.value,
      Cust_Cmprsd_Air_App: this.f.Cust_Cmprsd_Air_App.value,
      Cust_End_Product: this.f.Cust_End_Product.value,
      VisitingCardPath: this.attachmenName === undefined ? '' : this.attachmenName.Response,
      Created_By: this.session.session.PK_Resource_Id,
      PK_Industry_Id: Industry_Id
    };
    console.log(body);
    this.authenticationservice.SubmitCustomerDetails(body)
      .pipe(first())
      .subscribe(data => {
        this.CustID = data;
        console.log(this.CustID);
        this.loading = false;
        alert('Customer information saved successfully.');
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Invalid request.');
        this.loading = false;
      });
  }
  GetCompressorRoomDetailsList() {
    this.authenticationservice.GetCompressorRoomDetails(this.CustID)
      .pipe(first())
      .subscribe(data => {
        this.CompressorRoomDetailsList = data;
      });
  }
  onSubmitRoom(f) {
    if (this.CustID === 0) {
      alert('Add customer details first. ');
      return false;
    }
    if (this.f.Cust_Cmprsor_Model.value === '') {
      alert('Enter Model Details. ');
      return false;
    }
    if (this.f.Cust_Cmprsor_RoomDetails.value === '') {
      alert('Select Compressor Room Details. ');
      return false;
    }
    if (this.f.Cust_Cmprsor_Status.value === '') {
      alert('Select Cmprsor Status. ');
      return false;
    }
    let body = {
      PK_Cust_Id: this.CustID,
      Cust_Cmprsor_Model: this.f.Cust_Cmprsor_Model.value,
      Cust_Cmprsor_RoomDetails: this.f.Cust_Cmprsor_RoomDetails.value,
      Cust_Cmprsor_Mfg_Year: $('#Cust_Cmprsor_Mfg_Year').val(), // this.f.Cust_Cmprsor_Mfg_Year.value,
      Cust_Cmprsor_Commissioning_Year: $('#Cust_Cmprsor_Commissioning_Year').val(), // this.f.Cust_Cmprsor_Commissioning_Year.value,
      Cust_Cmprsor_Status: this.f.Cust_Cmprsor_Status.value,
      Created_By: this.session.session.PK_Resource_Id
    };
    this.authenticationservice.SubmitRoomDetails(body)
      .pipe(first())
      .subscribe(data => {
        alert('Compressor Room Details Saved successfully.');
        this.addcustomerForm.get('Cust_Cmprsor_Model').setValue('');
        this.addcustomerForm.get('Cust_Cmprsor_RoomDetails').setValue('');
        this.addcustomerForm.get('Cust_Cmprsor_Mfg_Year').setValue('');
        this.addcustomerForm.get('Cust_Cmprsor_Commissioning_Year').setValue('');
        this.GetCompressorRoomDetailsList();
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Invalid request.');
      });
  }
  GetContactDetailsList() {
    this.authenticationservice.GetContactDetailsList(this.CustID)
      .pipe(first())
      .subscribe(data => {
        this.ContactDetailsList = data;
      });
  }
  onSubmitContactDetail(f) {
    if (this.CustID === 0) {
      alert('Add customer details first. ');
      return false;
    }
    if (this.f.ContactPersonName.value === '') {
      alert('Enter Contact Persons Name. ');
      return false;
    }
    if (this.f.ContactPersonContactNo.value === '') {
      alert('Enter Contact Person Number. ');
      return false;
    }
    if (this.f.ContactPersonemail.value === '') {
      alert('Enter Email_id. ');
      return false;
    }
    if (this.f.Cust_Contact_Desigation.value === '') {
      alert('Select Designation. ');
      return false;
    }
    let body = {
      FK_Cust_Id: this.CustID,
      Cust_CntctPrson_Name: this.f.ContactPersonName.value,
      Cust_CntctPrson_Contact_No: this.f.ContactPersonContactNo.value,
      Cust_CntctPrson_Email_Id: this.f.ContactPersonemail.value,
      PK_Cust_CntctPrson_Mapng_Id: this.f.Cust_Contact_Desigation.value,
      Created_By: this.session.session.PK_Resource_Id // `${session.session.PK_Resource_Id}`
    };
    this.authenticationservice.SubmitCustContactPerson(body)
      .pipe(first())
      .subscribe(data => {
        alert('Contact Person Details Saved successfully.');
        this.GetContactDetailsList();
        this.addcustomerForm.get('ContactPersonName').setValue('');
        this.addcustomerForm.get('ContactPersonContactNo').setValue('');
        this.addcustomerForm.get('ContactPersonemail').setValue('');
        this.addcustomerForm.get('Cust_Contact_Desigation').setValue('');

      },
      error => {
        console.log(JSON.stringify(error));
        alert('Invalid request.');
      });
  }
  DeleteCompressorRoom(e) {
    let body = {
      PK_Cust_Cmprsor_Mapng_Id: e.PK_Cust_Cmprsor_Mapng_Id
    };
    this.authenticationservice.DeleteCompressorRoomList(body)
      .pipe(first())
      .subscribe(data => {
        this.data = data;
        alert(JSON.stringify(this.data.Response));
        this.GetCompressorRoomDetailsList();
      });
  }
  DeleteContactDetails(e) {
    let body = {
      PK_Cust_CntctPrson_Mapng_Id: e.PK_Cust_CntctPrson_Mapng_Id
    };
    this.authenticationservice.DeleteContactDetailsList(body)
      .pipe(first())
      .subscribe(data => {
        this.data = data;
        alert(JSON.stringify(this.data.Response));
        this.GetContactDetailsList();
      });
  }
  onSelectionChange(item) {
    let body = {
      PK_Cust_CntctPrson_Mapng_Id: item.PK_Cust_CntctPrson_Mapng_Id,
      Created_By: this.session.session.PK_Resource_Id,
      FK_Cust_Id: this.CustID
    };
    this.authenticationservice.UpdateCustContactPerson(body)
      .pipe(first())
      .subscribe(data => {
        this.data = data;
        this.GetContactDetailsList();
        alert('Set Default Number');
      });
  }
  onSelectAttachment(val: any) {
    console.log(val);
    this.attchment = val.target.files[0];
  }
  uploadVisitCard() {
    this.authenticationservice.UploadVisitCard(this.attchment)
     .subscribe(data => {
          this.attachmenName = data ;
          alert('File Uploaded Successfully');
          console.log(data);
     },
     error => {
      console.log(JSON.stringify(error));
      alert(error);
    });
 }
}

