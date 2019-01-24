import { Component, OnInit } from '@angular/core';
import { Master } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-master-industry',
  templateUrl: './add-industry.component.html',
  styleUrls: ['./add-industry.component.css']
})
export class AddIndustryComponent implements OnInit {
  public session: any;
  IndustryForm: FormGroup;
  submitted = false;
  public IndustryId = 0;
  public queryParamData: any;
  public IList: any;
  public IsActive;
  constructor(private masterservice: Master,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {}
    ngOnInit() {
       this.session = {
        session: JSON.parse(localStorage.getItem('currentUser'))
        };
        this.IndustryForm = this.formBuilder.group({
          Industry_Name : ['', Validators.required],
          Industry_Desc : ['', ''],
          IsActive : ['', '']
        });
        this.queryParamData = this.route.queryParams.subscribe(params => {
          if (params['Industry_Id'] !== undefined) {
          this.masterservice.IndustryList(params['Industry_Id'])
          .subscribe(data => {
           this.IList = data;
           this.IndustryId = this.IList.Response[0].Industry_Id;
           this.f.Industry_Name.setValue(this.IList.Response[0].Industry_Name);
           this.f.Industry_Desc.setValue(this.IList.Response[0].Industry_Desc);
           this.f.IsActive.setValue(this.IList.Responsess[0].IsActive === 1 ? true : false);
         });
        }
         });
    }
    get f() { return this.IndustryForm.controls; }
    onSubmit() {
      this.submitted = true;
      if (this.IndustryForm.invalid) {
        return;
      }
        let body = {
          Industry_Id: this.IndustryId,
          Industry_Name: this.f.Industry_Name.value,
          Industry_Desc: this.f.Industry_Desc.value,
          IsActive: this.f.IsActive.value === true ? 1 : 0,
          Created_By: this.session.session.PK_Resource_Id
        };
        this.masterservice.AddIndustry(body)
        .subscribe(data => {
          alert('Industry save successfully');
          this.router.navigate(['/masterIndustry']);
        });
    }
    Reset() {
        this.IndustryForm.reset();
    }
}