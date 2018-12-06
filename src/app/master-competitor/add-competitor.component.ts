import { Component, OnInit } from '@angular/core';
import {Competitor} from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-master-competitor',
  templateUrl: './add-competitor.component.html',
  styleUrls: ['./add-competitor.component.css']
})
export class AddCompetitorComponent implements OnInit {
public CompetitorTypelist: any;
CompetitorForm: FormGroup;
submitted = false;
public session: any;
public Competitor_Name;
public Competitor_Desc;
public CompetitorTypeId;
public IsActive;
public PKCompetitorId = 0;
public queryParamData: any;
public CList: any;
  constructor( private competitorservice: Competitor,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.CompetitorTypeDetails();
    this.CompetitorForm = this.formBuilder.group({
      Competitor_Name: ['', Validators.required],
      Competitor_Desc: ['', Validators.required],
      CompetitorTypeId: ['', Validators.required],
      IsActive: ['', ''],
    });
    this.queryParamData = this.route.queryParams.subscribe(params => {
      if (params['PK_Competitor_Id'] !== undefined) {
      this.competitorservice.editCompetitor(params['PK_Competitor_Id'])
      .subscribe(data => {
       this.CList = data;
       this.PKCompetitorId = this.CList.Response[0].PK_Competitor_Id;
       this.f.Competitor_Name.setValue(this.CList.Response[0].Competitor_Name);
       this.f.Competitor_Desc.setValue(this.CList.Response[0].Competitor_Desc);
       this.f.CompetitorTypeId.setValue(this.CList.Response[0].FK_Competitor_Type_Id);
       this.f.IsActive.setValue(this.CList.Response[0].IsActive === 1 ? true : false);
     });
    }
     });

  }
  get f() { return this.CompetitorForm.controls; }
  CompetitorTypeDetails() {
    this.competitorservice.Get_Competitor_Type_List()
      .subscribe(data => {
        this.CompetitorTypelist = data;
      });
  }
  onSubmit() {
    this.submitted = true;
    if (this.CompetitorForm.invalid) {
      return;
    }
    let body = {
      Competitor_Name: this.f.Competitor_Name.value,
      Competitor_Desc: this.f.Competitor_Desc.value,
      FK_Competitor_Type_Id: this.f.CompetitorTypeId.value,
      PK_Competitor_Id: this.PKCompetitorId,
      IsActive: this.f.IsActive.value === true ? 1 : 0 ,
      Created_By: this.session.session.PK_Resource_Id
    };
    this.competitorservice.AddCompetitor(body)
      .subscribe(data => {
        alert('Competitor save successfully');
        this.router.navigate(['/masterCompetitor']);
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Error');
      });
  }

  Reset() {
       this.CompetitorForm.reset();
  }
}
