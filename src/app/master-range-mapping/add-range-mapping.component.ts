import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../_services/common.service';
import { SubRangeMappingService } from '../_services/subRangeMapping.service';
import { ProductService } from '../_services/product.service';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'add-Range-Mapping',
  templateUrl: './add-range-mapping.component.html',
  styleUrls: ['./add-range-mapping.component.css']
})
export class AddRangeMappingComponent implements OnInit {
  public session: any;
  public mappingTypes : any;
  public rangeTypes : any;
  public sub_maptypeval : any;
  public subrangeTypes : any;
  public ff_list_code : any;
  public mapping_type : any;
  public maptypeval : any;
  public submaptypeval:any;
  public FK_Range_Id:string;
  public PK_Sub_Range_Id:any;
  // public expanded = false;
  public productDetails:any;
  public Product_Id:any;
  loading = false;
  submitted = false;
  public segmentList : any;
  public queryParamData : any;
  disabledAddUpdate : boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor( private Router: Router,
               private formBuilder: FormBuilder,
               private commonService : CommonService,
               private subRangeMappingService : SubRangeMappingService,
               private ProductService:ProductService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMappingTypes();
    this.mapping_type = 'M1';
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.queryParamData = this.route.queryParams.subscribe(params => {
      this.segmentList ={
      'PK_RangeMapping_Id' : params['PK_RangeMapping_Id'],
      'FK_MapType_Id' : params['FK_MapType_Id'],
      'FK_Range_Id' : params['FK_Range_Id'],
      'FK_Sub_Range_Id' : params['FK_Sub_Range_Id'],
      'FK_Prod_Id' : params['FK_Prod_Id'],
      'IsActive' : params['IsActive'],
      'Created_Date' : params['Created_Date'],
      'Created_By' : params['Created_By'],
      'Modified_Date' : params['Modified_Date'],
      'FK_W2S_List_Id' : params['FK_W2S_List_Id']
      } 
    });

  }
  
  getMappingList(data){
    this.maptypeval= data.target.value;
  }

  getSub_MappingList(data){
    this.sub_maptypeval= data.target.value;
    this.ff_list_code = this.subrangeTypes.filter(a=> a.PK_SubRange_Id == this.sub_maptypeval);
  }

  getMappingTypes(){
    this.commonService.getMappingTypes().subscribe(result => {
        this.mappingTypes = result;
    }); 
  }

  getSubMappingList(data){
  this.submaptypeval= data.target.value;
  this.mapping_type = data.target.value;
    if(data.target.value == 'M1'){
      this.commonService.getRangeTypes().subscribe(result => {
        this.rangeTypes = result;
      }); 
      this.subRangeMappingService.getSubRangeDetails().subscribe(result => {
        this.subrangeTypes = result;
        for(var i=0;i<this.subrangeTypes.length;i++)
        {
          this.subrangeTypes[i].isTrue=false;
        }
      }); 
    }else{
      this.subRangeMappingService.getSubRangeDetails().subscribe(result => {
        this.subrangeTypes = result;
      }); 
      this.ProductService.getAllProducts().subscribe(result => {
      this.productDetails = result;
      for(var i=0;i<this.productDetails.length;i++)
      {
        this.productDetails[i].isTrue=false;
      }
    });
    }
  }

//  showCheckboxes() {
//     var checkboxes = document.getElementById("checkboxes");
//     if (!this.expanded) {
//       checkboxes.style.display = "block";
//       this.expanded = true;
//     } else {
//       checkboxes.style.display = "none";
//       this.expanded = false;
//     }
//   }

  checkValue(obj:any) {
    obj.isTrue=!obj.isTrue;
  }
  checkValue_prod(obj:any){
    obj.isTrue=!obj.isTrue;
  }

  onSubmit() {

    if(this.subrangeTypes == undefined || this.subrangeTypes == ""){
      alert("Please select mapping type.");
      return false;
    }
    if(this.mapping_type == 'M2'){
    if(this.ff_list_code == undefined || this.ff_list_code == ""){
      alert("Please select sub mapping.");
      return false;
    }
  }
    this.FK_Range_Id = "";
    this.PK_Sub_Range_Id = "";
    this.Product_Id = "";
    if(this.mapping_type == 'M1'){
      for(var v=0;v<this.subrangeTypes.length;v++)
      {
        if(this.subrangeTypes[v].isTrue==true)
        {
          if(this.FK_Range_Id==""){
            this.FK_Range_Id = this.subrangeTypes[v].FK_W2S_List_Id;
            this.PK_Sub_Range_Id = this.subrangeTypes[v].PK_SubRange_Id;
          }
          else{
            this.FK_Range_Id=this.FK_Range_Id+","+this.subrangeTypes[v].FK_W2S_List_Id;
            this.PK_Sub_Range_Id = this.PK_Sub_Range_Id +","+this.subrangeTypes[v].PK_SubRange_Id;
          }
        }
      }
    }
    
    if(this.mapping_type == 'M2'){
      this.PK_Sub_Range_Id = this.sub_maptypeval;
      this.maptypeval = this.ff_list_code[0].FK_W2S_List_Id;
      this.FK_Range_Id = this.ff_list_code[0].FK_W2S_List_Id;
      for(var v=0;v<this.productDetails.length;v++)
      {
        if(this.productDetails[v].isTrue==true)
        {
          if(this.Product_Id==""){
            this.Product_Id = this.productDetails[v].Product_Id;
          }
          else{
            this.Product_Id = this.Product_Id+","+this.productDetails[v].Product_Id;
          }
        }
      }
    }

  
   var param = {
      PK_RangeMapping_Id : this.segmentList.PK_RangeMapping_Id,
      FK_MapType_Id : this.submaptypeval, 
      FK_Sub_Range_Id: this.PK_Sub_Range_Id,
      FK_Range_Id: this.maptypeval, 
      FK_Prod_Id: this.Product_Id,
      IsActive: this.segmentList.IsActive,
      Created_Date : Date.now,
      Created_By: this.session.session.PK_Resource_Id,
      FK_W2S_List_Id:this.FK_Range_Id,
    };

    if(param.FK_Range_Id == undefined || param.FK_Range_Id == ""){
      alert("Please select sub mapping.");
      return false;
    }
    if(param.FK_W2S_List_Id == undefined || param.FK_W2S_List_Id == ""){
      alert("Please select range mapping.");
      return false;
    }
    
    if(param.FK_MapType_Id == 'M2'){
      if(this.Product_Id = undefined || this.Product_Id == ""){
        alert("Please select range mapping.");
        return false;
      }
    }
    

    
    this.subRangeMappingService.AddRangeMapping(param).subscribe(result => {
      this.segmentList = result;
      this.Router.navigate(['/masterRangeMapping']);
      this.loading = false;
    });

  }

}
