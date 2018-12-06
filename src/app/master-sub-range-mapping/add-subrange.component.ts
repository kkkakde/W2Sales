import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../_services/common.service';
import { SegmentType } from '../_models';
import { SubRangeDetails } from '../_models/segmentType';
import { SubRangeMappingService } from '../_services/subRangeMapping.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'add-sub-range',
  templateUrl: './add-subrange.component.html',
  styleUrls: ['./add-subrange.component.css']
})
export class AddSubRangeComponent implements OnInit {
  addSubRangeForm: FormGroup;
  public segmentList : any;
  subRange : SubRangeDetails = new SubRangeDetails();
  public sunRangeList : any;
  loading = false;
  submitted = false;
  public queryParamData : any;
  disabledAddUpdate : boolean = false;

  constructor( private Router: Router,
               private formBuilder: FormBuilder,
               private commonService : CommonService,
               private subRangeMappingService : SubRangeMappingService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSegmentList();
    this.addSubRangeForm = this.formBuilder.group({
        Segment_Type:['', Validators.required],
        SubRange_Name:['', Validators.required],
        SubRange_Description: ['', Validators.required],
        IsActive:['','']
    });

    this.queryParamData = this.route.queryParams.subscribe(params => {
      this.sunRangeList ={
       'PK_SubRange_Id' : params['PK_SubRange_Id'],
       'FK_W2S_List_Id' : params['FK_W2S_List_Id'],
       'SubRange_Name' : params['SubRange_Name'],
       'SubRange_Description' : params['SubRange_Description'],
       'IsActive' : params['IsActive']
      } 
    });
    this.disabledAddUpdate = this.sunRangeList.PK_SubRange_Id;
    this.f.Segment_Type.setValue(this.sunRangeList.FK_W2S_List_Id);
    this.f.SubRange_Name.setValue(this.sunRangeList.SubRange_Name);
    this.f.SubRange_Description.setValue(this.sunRangeList.SubRange_Description);
    this.f.IsActive.setValue(this.sunRangeList.IsActive);
  }

  get f() { return this.addSubRangeForm.controls;
  }
  
  getSegmentList(){
    this.commonService.getSegmentList().subscribe(result => {
        this.segmentList = result;
      }); 
  }

  onSubmit() {
    var param;
    this.loading = true;
    this.submitted = true;
    if (this.addSubRangeForm.invalid) {
        this.loading = false;
        return;
    }else{
           if(this.sunRangeList.PK_SubRange_Id != undefined){
            param = {
              PK_SubRange_Id : this.sunRangeList.PK_SubRange_Id,
              FK_W2S_List_Id : this.f.Segment_Type.value,
              SubRange_Name: this.f.SubRange_Name.value,
              SubRange_Description: this.f.SubRange_Description.value,
              IsActive: this.f.IsActive.value
            };
            this.subRangeMappingService.updateSubRangeDetails(param).subscribe(result => {
              this.segmentList = result;
              this.Router.navigate(['/masterSubRangeMapping']);
              this.loading = false;
            });
           }else{
            param = {
              PK_SubRange_Id:  this.subRange.PK_SubRange_Id = 0,
              FK_W2S_List_Id: this.f.Segment_Type.value,
              SubRange_Name: this.f.SubRange_Name.value,
              SubRange_Description: this.f.SubRange_Description.value,
              IsActive: this.f.IsActive.value
            };
              this.subRangeMappingService.addSubRange(param).subscribe(result => {
                    this.segmentList = result;
                    this.Router.navigate(['/masterSubRangeMapping']);
                    this.loading = false;
              });

           }
        
    }
  }
}
