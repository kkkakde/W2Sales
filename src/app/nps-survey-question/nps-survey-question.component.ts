import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Opportunities } from '../_services';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-nps-survey-question',
  templateUrl: './nps-survey-question.component.html',
  styleUrls: ['./nps-survey-question.component.css']
})
export class NpsSurveyQuestionComponent implements OnInit {
  npssurveyquestionForm: FormGroup;
  submitted = false;
  public yesflag = true;
  public noflag;
  private sub: any;
  public loading;
  public PK_Opportunity_Id;
  public NPSData: any;
  public NSPStatus;
  public radflag;
  constructor( private authenticationservice: Opportunities,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }
      ngOnInit() {
    this.npssurveyquestionForm = this.formBuilder.group({
      NpsSurveyQuestion: ['', ''],
      LostFeedback: ['', '']
    });
      this.sub = this.route.queryParams.subscribe(params => {
      this.PK_Opportunity_Id = params['PK_Opportunity_Id'];
    });
    this.authenticationservice.GetCustFeedback(this.PK_Opportunity_Id)
      .subscribe(data => {
       this.NPSData = data;
       if (this.NPSData != null) {
         this.NSPStatus = this.NPSData.FK_Status;
       } else {
        this.NSPStatus = '';
       }
      });
  }
  get f() { return this.npssurveyquestionForm.controls; }
  rdoYes() {
    this.yesflag = true;
    this.noflag = false;
  }
  rdoNo() {
    this.yesflag = false;
    this.noflag = true;
  }
  onSubmit() {
    $('#btncancel').hide();
    this.submitted = true;
    this.loading = true;
    if (this.npssurveyquestionForm.invalid) {
      return;
    }
    if ($("input[name='q2ans']:checked").val() === 'yes') {
      this.radflag = 'Y';
    } else {
      this.radflag = 'N';
    }
    let body = {
      PK_Opportunity_Id: this.PK_Opportunity_Id,
      CustomerWon_Feedback: this.f.NpsSurveyQuestion.value,
      CustomerLost_Feedback: this.f.LostFeedback.value,
      CustomerLostNextPFlag: this.radflag
    };
    this.authenticationservice.AddCustomerFeedback(body)
      .subscribe(data => {
        alert('Save successfully');
        $('#npsquestion').hide();
        this.loading = false;
      },
      error => {
        console.log(JSON.stringify(error));
        this.loading = false;
        alert('Error');
      });
  }

}
