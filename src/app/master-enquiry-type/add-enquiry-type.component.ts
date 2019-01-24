import { Component, OnInit } from '@angular/core';
import { Master } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-master-enquiry-type',
  templateUrl: './add-enquiry-type.component.html',
  styleUrls: ['./add-enquiry-type.component.css']
})
export class AddEnquiryTypeComponent implements OnInit {
  public session: any;
  EnquiryTypeForm: FormGroup;
  submitted = false;
  public EnquiryTypeId = 0;
  public queryParamData: any;
  public ETList: any;
  public IsActive;
  constructor(private masterservice: Master,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
      };
      this.EnquiryTypeForm = this.formBuilder.group({
        Enquiry_type_Name : ['', Validators.required],
        Enquiry_type_Desc : ['', ''],
          IsActive : ['', '']
      });
      this.queryParamData = this.route.queryParams.subscribe(params => {
        if (params['Enquiry_Type_Id'] !== undefined) {
        this.masterservice.EditEnquiryType(params['Enquiry_Type_Id'])
        .subscribe(data => {
         this.ETList = data;
         this.EnquiryTypeId = this.ETList.Response[0].Enquiry_Type_Id;
         this.f.Enquiry_type_Name.setValue(this.ETList.Response[0].Enquiry_Type_Name);
         this.f.Enquiry_type_Desc.setValue(this.ETList.Response[0].Enquiry_Type_Description);
         this.f.IsActive.setValue(this.ETList.Response[0].IsActive === 1 ? true : false);
       });
      }
       });
  }
  get f() { return this.EnquiryTypeForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.EnquiryTypeForm.invalid) {
      return;
    }
      let body = {
          Enquiry_Type_Id: this.EnquiryTypeId,
          Enquiry_Type_Name: this.f.Enquiry_type_Name.value,
          Enquiry_Type_Description: this.f.Enquiry_type_Desc.value,
          IsActive: this.f.IsActive.value === true ? 1 : 0,
          Created_By: this.session.session.PK_Resource_Id
      };
      this.masterservice.AddEnquirytypeList(body)
      .subscribe(data => {
        alert('Enquiry Type save successfully');
        this.router.navigate(['/masterEnquiryType']);
      });
  }
  Reset() {
      this.EnquiryTypeForm.reset();
  }
}
