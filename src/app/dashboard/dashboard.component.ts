import { Component, OnInit } from '@angular/core';
import { CommonService, SearchFilter} from '../_services';
import {FormGroup, FormBuilder} from '@angular/forms';
import { GraphObjectList } from '../_models/graph';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  SerachForm: FormGroup;
  public  title: string = '';
  public getLatLongList: any;
  public ListData: any;
  public session: any;
  public lat: number;
  public lng: number;
  public BLMlist: any;
  public ZMlist: any;
  public ASMlist: any;
  public Dealerlist: any;
  public SalesEngineerlist: any;
  public BLMShowHidetbl = true;
  public ZMShowHidetbl = true;
  public ASMTMShowHidetbl = true;
  public DealerShowHidetbl = true;
  public SalesEShowHidetbl = true;
  public list: any;
  public headerName;
  public ZM;
  public ASMTM;
  public Dealer;
  public SalesEngineer;
  public headerShowHidetbl: any;
  public chartData: any;
  public  type1 = 'bar2d';
  public  GraphCountList: any;
  public chartConfig: object;
  graphObj: GraphObjectList = new GraphObjectList();
  constructor(private commonservice: CommonService,
  private formBuilder: FormBuilder,
  private searchfilterservice: SearchFilter) {
         this.graphObj.visitchartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         };
         this.graphObj.opportunitychartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         };
         this.graphObj.salesPhasechartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         };
         this.graphObj.revenueSummarychartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         };
         this.graphObj.revenueWonbySalesReprchartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         };
    }
    ngOnInit() {
    this.GetBLMDetails();
    this.GetZMDetails();
    this.session = {
        session: JSON.parse(localStorage.getItem('currentUser'))
        };
        if (this.session.session.FK_Designation_Id === 1) { this.BLMShowHidetbl = false; }
        if (this.session.session.FK_Designation_Id === 2) {
          this.BLMShowHidetbl = false;
          this.ZMShowHidetbl = false;
          this.searchfilterservice.GetASMDetails(this.session.session.FK_Zone_Id)
          .subscribe(data => {
             this.ASMlist =  data;
          });
         }
         if (this.session.session.FK_Designation_Id === 3) {
          this.BLMShowHidetbl = false;
          this.ZMShowHidetbl = false;
          this.ASMTMShowHidetbl = false;
          let body = {
            FK_Zone_Id: this.session.session.FK_Zone_Id,
            FK_State_Id: this.session.session.FK_State_Id,
           };
          this.searchfilterservice.GetDealerDetails(body)
          .subscribe(data => {
             this.Dealerlist =  data;
          });
         }
        if (this.session.session.FK_Designation_Id === 4) {
         this.BLMShowHidetbl = false;
         this.ZMShowHidetbl = false;
         this.ASMTMShowHidetbl = false;
         this.DealerShowHidetbl = false;
         let body = {
          FK_Zone_Id: this.session.session.FK_Zone_Id,
          FK_State_Id: this.session.session.FK_State_Id,
          Dealer_Id:  this.session.session.PK_Resource_Id,
         };
        this.searchfilterservice.GetSalesEngineerDetails(body)
        .subscribe(data => {
           this.SalesEngineerlist =  data;
        });
         }
         this.SerachForm = this.formBuilder.group({
        BLMName : ['', ''],
        ZMName : ['', ''],
        ASMName : ['', ''],
        DealerName : ['', ''],
        SalesEngineer : ['', '']
         });
        this.lat = 18.5204;
        this.lng = 73.8567;
        this.commonservice.getLatLongList(this.session.session.PK_Resource_Id)
        .subscribe(data => {
        this.getLatLongList = data;
        });
        let body = {
            CreatedBy: this.session.session.PK_Resource_Id,
            Year: new Date().getFullYear(),
        };
        this.commonservice.getCount(body)
        .subscribe(res => {
           this.GraphCountList = res;
             this.graphObj.visitdataSource = {
                'chart': {
                        'caption': 'Visits',
                        'captionFontSize': '16',
                        'captionFont': 'UniversLTStd',
                        'captionFontBold': 0,
                        'captionFontColor': '#0088bb',
                        'xaxisname': 'Month',
                        'yaxisname': 'Visit Count' + ' ' +  new Date().getFullYear(),
                        'numbersuffix': '',
                        'theme': 'fusion'
                    },
                'data': this.GraphCountList.visitCount
              };
             this.graphObj.opportunitydataSource = {
                'chart': {
                        'caption': 'Opportunity',
                        'captionFontSize': '16',
                        'captionFont': 'UniversLTStd',
                        'captionFontBold': 0,
                        'captionFontColor': '#0088bb',
                        'xaxisname': 'Month',
                        'yaxisname': 'Opportunity Count' + ' ' +  new Date().getFullYear(),
                        'numbersuffix': '',
                        'theme': 'fusion'
                    },
                'data': this.GraphCountList.opportunityCount
              };
              this.graphObj.salesPhasedataSource = {
               'chart': {
                  'caption': 'Sales Phase',
                  'captionFontSize': '16',
                  'captionFont': 'UniversLTStd',
                  'captionFontBold': 0,
                  'captionFontColor': '#0088bb',
                  'yaxisname': 'Values(K)',
                  'aligncaptionwithcanvas': '0',
                  'plottooltext': '<b>$dataValue</b> Revenue Done',
                  'theme': 'fusion'
              },
               'data': this.GraphCountList.salesPhaseCount
             };
             this.graphObj.revenueSummarydataSource = {
               "chart": {
                     "caption": "Revenue Summary",
                     "captionFontSize": "16",
                     "captionFont": "UniversLTStd",
                     "captionFontBold": 0,
                     "captionFontColor": "#0088bb",
                     "xaxisname": "Month",
                     "yaxisname": "Revenue",
                     "numbersuffix": "K",
                     "theme": "fusion"
               },
               'data': [
                     {
                        "label": "Jan",
                        "value": "29"
                     },
                     {
                        "label": "Feb",
                        "value": "26"
                     },
                     {
                        "label": "Mar",
                        "value": "18"
                     },
                     {
                        "label": "Apr",
                        "value": "14"
                     },
                     {
                        "label": "May",
                        "value": "15"
                     },
                     {
                        "label": "Jun",
                        "value": "10"
                     },
                     {
                        "label": "Jul",
                        "value": "30"
                     },
                     {
                        "label": "Aug",
                        "value": "30"
                     },
                     {
                        "label": "Sep",
                        "value": "15"
                     },
                     {
                        "label": "Oct",
                        "value": "10"
                     },
                     {
                        "label": "Nov",
                        "value": "30"
                     },
                     {
                        "label": "Dec",
                        "value": "30"
                     }
               ]
             };
             this.graphObj.revenueWonbySalesReprdataSource = {
                   "chart": {
                       "caption": "Revenue Won by Sales Representative",
                       "captionFontSize": "16",
                       "captionFont": "UniversLTStd",
                       "captionFontBold": 0,
                       "captionFontColor": "#0088bb",
                       "yaxisname": "Revenue(INR)",
                       "aligncaptionwithcanvas": "0",
                       "plottooltext": "<b>$dataValue</b> Revenue Done",
                       "theme": "fusion"
                   },
                   "data": [
                       {
                           "label": "Raj",
                           "value": "48"
                       },
                       {
                           "label": "Rahul",
                           "value": "39"
                       },
                       {
                           "label": "Rishikesh",
                           "value": "28"
                       }
           
                   ]
             };
        });
    }
    get f() { return this.SerachForm.controls; }
    GetBLMDetails() {
    this.searchfilterservice.GetBLMDetails()
    .subscribe(data => {
       this.BLMlist =  data;
    });
    }
    GetZMDetails() {
    this.searchfilterservice.GetZMDetails()
    .subscribe(data => {
       this.ZMlist =  data;
    });
    }
    onChangeSelectZM(val: any) {
    let zm = val.target.options[val.target.options.selectedIndex].text;
    this.ZM=zm +'->';
    this.searchfilterservice.GetASMDetails(val.target.value)
    .subscribe(data => {
       this.ASMlist =  data;
    });
    }
    onChangeSelectASM(val:any) {
    let asm = val.target.options[val.target.options.selectedIndex].text;
    this.ASMTM=asm +'->';
     let body = {
      FK_Zone_Id: this.session.session.FK_Zone_Id,
      FK_State_Id: this.f.ASMName.value,
     };
    this.searchfilterservice.GetDealerDetails(body)
    .subscribe(data => {
       this.Dealerlist =  data;
    });
    }
    onChangeSelectDealer(val:any) {
    let dealer = val.target.options[val.target.options.selectedIndex].text;
    this.Dealer=dealer +'->';
    let body = {
      FK_Zone_Id: this.session.session.FK_Zone_Id,
      FK_State_Id: this.session.session.FK_State_Id,
      Dealer_Id: this.f.DealerName.value
     };
    this.searchfilterservice.GetSalesEngineerDetails(body)
    .subscribe(data => {
       this.SalesEngineerlist =  data;
    });
    }
    onChangeSelectsales(val:any) {
    let Sales = val.target.options[val.target.options.selectedIndex].text;
    this.SalesEngineer=Sales;
    }
    showpopup() {
      $('.panel-collapse').collapse('show');
     this.SerachForm.get('ZMName').setValue('');
     this.SerachForm.get('ASMName').setValue('');
     this.SerachForm.get('DealerName').setValue('');
     this.SerachForm.get('SalesEngineer').setValue('');
    }
    onSubmit() {
    $('.panel-collapse').collapse('hide');
    let body = {
      FK_Zone_Id: this.f.ZMName.value,
      FK_State_Id: this.f.ASMName.value,
      AreaManager_Id: this.f.DealerName.value,
      PK_Resource_Id: this.f.SalesEngineer.value
    };
    this.commonservice.SearchFilterWiseData(body)
    .subscribe(data => {
      this.ListData = data;
    });
    }






















}
