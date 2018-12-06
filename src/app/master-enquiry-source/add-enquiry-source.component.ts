import { Component, OnInit } from '@angular/core';
import { Master } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-master-industry',
  templateUrl: './add-enquiry-source.component.html',
  styleUrls: ['./add-enquiry-source.component.css']
})
export class AddEnquirySourceComponent implements OnInit {
  public session: any;
  EnquirySourceForm: FormGroup;
  submitted = false;
  public EnquirySourceId = 0;
  public queryParamData: any;
  public ESList: any;

  constructor(private masterservice: Master,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {}
    ngOnInit() {
       this.session = {
        session: JSON.parse(localStorage.getItem('currentUser'))
        };
        this.EnquirySourceForm = this.formBuilder.group({
            Enquiry_Source_Name : ['', Validators.required],
            Enquiry_Source_Desc : ['', ''],
            IsActive : ['', '']
        });
        this.queryParamData = this.route.queryParams.subscribe(params => {
          if (params['Enquiry_Source_Id'] !== undefined) {
          this.masterservice.EditEnquirySource(params['Enquiry_Source_Id'])
          .subscribe(data => {
           this.ESList = data;
           this.EnquirySourceId = this.ESList.Response[0].Enquiry_Source_Id;
           this.f.Enquiry_Source_Name.setValue(this.ESList.Response[0].Enquiry_Source_Name);
           this.f.Enquiry_Source_Desc.setValue(this.ESList.Response[0].Enquiry_Source_Desc);
           this.f.IsActive.setValue(this.ESList.Response[0].IsActive === 1 ? true : false);
         });
        }
         });
    }
    get f() { return this.EnquirySourceForm.controls; }
    onSubmit() {
      this.submitted = true;
      if (this.EnquirySourceForm.invalid) {
        return;
      }
        let body = {
            Enquiry_Source_Id: this.EnquirySourceId,
            Enquiry_Source_Name: this.f.Enquiry_Source_Name.value,
            Enquiry_Source_Desc: this.f.Enquiry_Source_Desc.value,
            IsActive: this.f.IsActive.value === true ? 1 : 0,
            Created_By: this.session.session.PK_Resource_Id
        };
        this.masterservice.AddEnquirySource(body)
        .subscribe(data => {
          alert('Enquiry Source save successfully');
          this.router.navigate(['/masterEnquirySource']);
        });
    }
    Reset() {
        this.EnquirySourceForm.reset();
    }
}