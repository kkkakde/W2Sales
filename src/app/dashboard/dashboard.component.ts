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
         this.graphObj.wonLossRatechartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         };
         this.graphObj.wonLossRevenuechartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         };
         this.graphObj.wonLossReasonchartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         };
         this.graphObj.opportunitiesbyStatuschartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         };
         this.graphObj.appointmentbyCategorychartConfig = {
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
        let bodylatlng = {
         FK_Designation_Id: this.session.session.FK_Designation_Id ,
         FK_Zone_Id: this.session.session.FK_Zone_Id,
         Created_By: this.session.session.PK_Resource_Id,
         };
        this.commonservice.getLatLongList(bodylatlng)
        .subscribe(data => {
        this.getLatLongList = data;
        });
        let body = {
            Created_By: this.session.session.PK_Resource_Id,
            StartDate:'01-01-'+ new Date().getFullYear()+'',
            EndDate:'31-12-'+ new Date().getFullYear()+'',
            FK_Designation_Id: this.session.session.FK_Designation_Id ,
            FK_Zone_Id: this.session.session.FK_Zone_Id
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
                  'yaxisname': 'Values',
                  'aligncaptionwithcanvas': '0',
                  'plottooltext': '<b>$dataValue</b>',
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
             this.graphObj.wonLossRatedataSource = {
               "chart": {
                          "caption": "Won Loss Rate",
                          "captionFontSize": "16",
                          "captionFont": "UniversLTStd",
                          "captionFontBold": 0,
                          "captionFontColor": "#0088bb",
                          "yaxisname": "Percentage",
                          // "subcaption": "2012-2016",
                          "showhovereffect": "1",
                          // "numbersuffix": "%",
                          "drawcrossline": "1",
                          "plottooltext": "<b>$dataValue</b> of $seriesName in $label",
                          "theme": "fusion"
                      },
                      "categories": [
                          {
                              "category": [
                                  {
                                      "label": "Jan"
                                  },
                                  {
                                      "label": "Feb"
                                  },
                                  {
                                      "label": "Mar"
                                  },
                                  {
                                      "label": "Apr"
                                  },
                                  {
                                      "label": "May"
                                  },
                                  {
                                      "label": "Jun"
                                  },
                                  {
                                      "label": "Jul"
                                  },
                                  {
                                      "label": "Aug"
                                  },
                                  {
                                      "label": "Sep"
                                  },
                                  {
                                      "label": "Oct"
                                  },
                                  {
                                      "label": "Nov"
                                  },
                                  {
                                      "label": "Dec"
                                  }
                              ]
                          }
                      ],
                      "dataset": [
                          {
                              "seriesname": "Won",
                              "data": [
                                  {
                                      "value": "62"
                                  },
                                  {
                                      "value": "64"
                                  },
                                  {
                                      "value": "64"
                                  },
                                  {
                                      "value": "66"
                                  },
                                  {
                                      "value": "78"
                                  },
                                  {
                                      "value": "62"
                                  },
                                  {
                                      "value": "64"
                                  },
                                  {
                                      "value": "64"
                                  },
                                  {
                                      "value": "66"
                                  },
                                  {
                                      "value": "78"
                                  },
                                  {
                                      "value": "66"
                                  },
                                  {
                                      "value": "78"
                                  }
                              ]
                          },
                          {
                              "seriesname": "Loss",
                              "data": [
                                  {
                                      "value": "16"
                                  },
                                  {
                                      "value": "28"
                                  },
                                  {
                                      "value": "34"
                                  },
                                  {
                                      "value": "12"
                                  },
                                  {
                                      "value": "24"
                                  },
                                  {
                                      "value": "16"
                                  },
                                  {
                                      "value": "28"
                                  },
                                  {
                                      "value": "34"
                                  },
                                  {
                                      "value": "42"
                                  },
                                  {
                                      "value": "54"
                                  },
                                  {
                                      "value": "42"
                                  },
                                  {
                                      "value": "54"
                                  }
                              ]
                          }
                      ]
             };
             this.graphObj.wonLossRevenuedataSource = {
               "chart": {
                          "caption": "Won Loss Revenue",
                          "captionFontSize": "16",
                          "captionFont": "UniversLTStd",
                          "captionFontBold": 0,
                          "captionFontColor": "#0088bb",
                          // "subcaption": "2012-2016",
                          "xaxisname": "Month",
                          "yaxisname": "Revenue",
                          "formatnumberscale": "1",
                          "plottooltext": "<b>$dataValue</b> on <b>$seriesName</b> in $label",
                          "theme": "fusion",
                          "drawcrossline": "1"
                      },
                      "categories": [
                          {
                              "category": [
                                  {
                                      "label": "Jan"
                                  },
                                  {
                                      "label": "Feb"
                                  },
                                  {
                                      "label": "Mar"
                                  },
                                  {
                                      "label": "Apr"
                                  },
                                  {
                                      "label": "May"
                                  },
                                  {
                                      "label": "Jun"
                                  },
                                  {
                                      "label": "Jul"
                                  },
                                  {
                                      "label": "Aug"
                                  },
                                  {
                                      "label": "Sep"
                                  },
                                  {
                                      "label": "Oct"
                                  },
                                  {
                                      "label": "Nov"
                                  },
                                  {
                                      "label": "Dec"
                                  }
                              ]
                          }
                      ],
                      "dataset": [
                          {
                              "seriesname": "Won",
                              "data": [
                                  {
                                      "value": "12500"
                                  },
                                  {
                                      "value": "35000"
                                  },
                                  {
                                      "value": "48000"
                                  },
                                  {
                                      "value": "80000"
                                  },
                                  {
                                      "value": "170000"
                                  },
                                  {
                                      "value": "12500"
                                  },
                                  {
                                      "value": "30000"
                                  },
                                  {
                                      "value": "48000"
                                  },
                                  {
                                      "value": "80000"
                                  },
                                  {
                                      "value": "180000"
                                  },
                                  {
                                      "value": "80000"
                                  },
                                  {
                                      "value": "190000"
                                  }
                              ]
                          },
                          {
                              "seriesname": "Loss",
                              "data": [
                                  {
                                      "value": "7000"
                                  },
                                  {
                                      "value": "15000"
                                  },
                                  {
                                      "value": "35000"
                                  },
                                  {
                                      "value": "60000"
                                  },
                                  {
                                      "value": "140000"
                                  },
                                  {
                                      "value": "7000"
                                  },
                                  {
                                      "value": "15000"
                                  },
                                  {
                                      "value": "35000"
                                  },
                                  {
                                      "value": "60000"
                                  },
                                  {
                                      "value": "140000"
                                  },
                                  {
                                      "value": "60000"
                                  },
                                  {
                                      "value": "140000"
                                  }
                              ]
                          }
              
                      ]
              
             };
             this.graphObj.wonLossReasondataSource = {
               "chart": {
                      "caption": "Won Loss Reason",
                      "captionFontSize": "16",
                      "captionFont": "UniversLTStd",
                      "captionFontBold": 0,
                      "captionFontColor": "#0088bb",
                      // "subcaption": "In MMbbl = One Million barrels",
                      "xaxisname": "Reason",
                      "yaxisname": "No. of deals",
                      // "numbersuffix": "K",
                      "theme": "fusion"
                  },
                  "data": [
                      {
                          "label": "Reason1",
                          "value": "29"
                      },
                      {
                          "label": "Reason2",
                          "value": "26"
                      },
                      {
                          "label": "Reason3",
                          "value": "18"
                      },
                      {
                          "label": "Reason4",
                          "value": "14"
                      },
                      {
                          "label": "Reason5",
                          "value": "15"
                      },
                      {
                          "label": "Reason6",
                          "value": "10"
                      }
                  ]
             };
             this.graphObj.opportunitiesbyStatusdataSource = {
               "chart": {
                          "caption": "Opportunities by Status",
                          "captionFontSize": "16",
                          "captionFont": "UniversLTStd",
                          "captionFontBold": 0,
                          "captionFontColor": "#0088bb",
                          //"subcaption": " Top 5 Developed Countries",
                          //"numbersuffix": " TWh",
                          "showsum": "0",
                          //"plottooltext": "$label produces <b>$dataValue</b> of energy from $seriesName",
                          "theme": "fusion",
                          "drawcrossline": "1"
                      },
                      "categories": [
                          {
                              "category": [
                                  {
                                      "label": "Jan"
                                  },
                                  {
                                      "label": "Feb"
                                  },
                                  {
                                      "label": "Mar"
                                  },
                                  {
                                      "label": "Apr"
                                  },
                                  {
                                      "label": "May"
                                  },
                                  {
                                      "label": "Jun"
                                  },
                                  {
                                      "label": "Jul"
                                  },
                                  {
                                      "label": "Aug"
                                  },
                                  {
                                      "label": "Sep"
                                  },
                                  {
                                      "label": "Oct"
                                  },
                                  {
                                      "label": "Nov"
                                  },
                                  {
                                      "label": "Dec"
                                  }
                              ]
                          }
                      ],
                      "dataset": [
                          {
                              "seriesname": "Inprocess",
                              "data": [
                                  {
                                      "value": "400"
                                  },
                                  {
                                      "value": "830"
                                  },
                                  {
                                      "value": "500"
                                  },
                                  {
                                      "value": "420"
                                  },
                                  {
                                      "value": "790"
                                  },
                                  {
                                      "value": "380"
                                  },
                                  {
                                      "value": "400"
                                  },
                                  {
                                      "value": "830"
                                  },
                                  {
                                      "value": "500"
                                  },
                                  {
                                      "value": "420"
                                  },
                                  {
                                      "value": "790"
                                  },
                                  {
                                      "value": "380"
                                  }
                              ]
                          },
                          {
                              "seriesname": "Lost",
                              "data": [
                                  {
                                      "value": "350"
                                  },
                                  {
                                      "value": "620"
                                  },
                                  {
                                      "value": "410"
                                  },
                                  {
                                      "value": "370"
                                  },
                                  {
                                      "value": "720"
                                  },
                                  {
                                      "value": "310"
                                  },
                                  {
                                      "value": "350"
                                  },
                                  {
                                      "value": "620"
                                  },
                                  {
                                      "value": "410"
                                  },
                                  {
                                      "value": "370"
                                  },
                                  {
                                      "value": "720"
                                  },
                                  {
                                      "value": "310"
                                  }
                              ]
                          },
                          {
                              "seriesname": "Open",
                              "data": [
                                  {
                                      "value": "210"
                                  },
                                  {
                                      "value": "400"
                                  },
                                  {
                                      "value": "450"
                                  },
                                  {
                                      "value": "180"
                                  },
                                  {
                                      "value": "570"
                                  },
                                  {
                                      "value": "270"
                                  },
                                  {
                                      "value": "210"
                                  },
                                  {
                                      "value": "400"
                                  },
                                  {
                                      "value": "450"
                                  },
                                  {
                                      "value": "180"
                                  },
                                  {
                                      "value": "570"
                                  },
                                  {
                                      "value": "270"
                                  }
                              ]
                          },
                          {
                              "seriesname": "Stopped",
                              "data": [
                                  {
                                      "value": "180"
                                  },
                                  {
                                      "value": "330"
                                  },
                                  {
                                      "value": "230"
                                  },
                                  {
                                      "value": "160"
                                  },
                                  {
                                      "value": "440"
                                  },
                                  {
                                      "value": "350"
                                  },
                                  {
                                      "value": "180"
                                  },
                                  {
                                      "value": "330"
                                  },
                                  {
                                      "value": "230"
                                  },
                                  {
                                      "value": "160"
                                  },
                                  {
                                      "value": "440"
                                  },
                                  {
                                      "value": "350"
                                  }
                              ]
                          },
                          {
                              "seriesname": "Win",
                              "data": [
                                  {
                                      "value": "60"
                                  },
                                  {
                                      "value": "200"
                                  },
                                  {
                                      "value": "200"
                                  },
                                  {
                                      "value": "50"
                                  },
                                  {
                                      "value": "230"
                                  },
                                  {
                                      "value": "150"
                                  },
                                  {
                                      "value": "60"
                                  },
                                  {
                                      "value": "200"
                                  },
                                  {
                                      "value": "200"
                                  },
                                  {
                                      "value": "50"
                                  },
                                  {
                                      "value": "230"
                                  },
                                  {
                                      "value": "150"
                                  }
                              ]
                          }
                      ]
            };
            this.graphObj.appointmentbyCategorydataSource = {
               "chart": {
                          "caption": "Appointment by Category",
                          "captionFontSize": "16",
                          "captionFont": "UniversLTStd",
                          "captionFontBold": 0,
                          "captionFontColor": "#0088bb",
                          // "subcaption": " Top 5 Developed Countries",
                          // "numbersuffix": " TWh",
                          "showsum": "0",
                          // "plottooltext": "$label produces <b>$dataValue</b> of energy from $seriesName",
                          "theme": "fusion",
                          "drawcrossline": "1"
                      },
                      "categories": [
                          {
                              "category": [
                                  {
                                      "label": "1"
                                  },
                                  {
                                      "label": "2"
                                  },
                                  {
                                      "label": "3"
                                  },
                                  {
                                      "label": "4"
                                  },
                                  {
                                      "label": "5"
                                  }
                              ]
                          }
                      ],
                      "dataset": [
                          {
                              "seriesname": "Follow-Up",
                              "data": [
                                  {
                                      "value": "400"
                                  },
                                  {
                                      "value": "830"
                                  },
                                  {
                                      "value": "500"
                                  },
                                  {
                                      "value": "420"
                                  },
                                  {
                                      "value": "790"
                                  }
                              ]
                          },
                          {
                              "seriesname": "Measurement",
                              "data": [
                                  {
                                      "value": "350"
                                  },
                                  {
                                      "value": "620"
                                  },
                                  {
                                      "value": "410"
                                  },
                                  {
                                      "value": "370"
                                  },
                                  {
                                      "value": "720"
                                  }
                              ]
                          },
                          {
                              "seriesname": "Prospecting",
                              "data": [
                                  {
                                      "value": "210"
                                  },
                                  {
                                      "value": "400"
                                  },
                                  {
                                      "value": "450"
                                  },
                                  {
                                      "value": "180"
                                  },
                                  {
                                      "value": "570"
                                  }
                              ]
                          },
                          {
                              "seriesname": "Sales Visit",
                              "data": [
                                  {
                                      "value": "180"
                                  },
                                  {
                                      "value": "330"
                                  },
                                  {
                                      "value": "230"
                                  },
                                  {
                                      "value": "160"
                                  },
                                  {
                                      "value": "440"
                                  }
                              ]
                          }
                      ]
              
            };
        });
        $('#StartDate').datepicker({
            startDate: new Date(),
            format: "dd-M-yyyy",
            changeYear: true,
            defaultDate: new Date(), autoclose: true
          });
          $('#EndDate').datepicker({
            startDate: new Date(),
            format: "dd-M-yyyy",
            defaultDate: new Date(), autoclose: true
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
    this.ZM=zm +'/';
    this.searchfilterservice.GetASMDetails(val.target.value)
    .subscribe(data => {
       this.ASMlist =  data;
    });
    }
    onChangeSelectASM(val:any) {
    let asm = val.target.options[val.target.options.selectedIndex].text;
    this.ASMTM=asm +'/';
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
    this.Dealer=dealer +'/';
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
     $('#StartDate').val('');
     $('#EndDate').val('');
    }
    onSubmit() {
     this.GraphCountList='';
     var StartDate =new Date( $('#StartDate').val());
     var EndDate = new Date ($('#EndDate').val());
     if((StartDate.getFullYear()) !== (EndDate.getFullYear())) {
       alert('Please select same year date');
       return false;
        }
    $('.panel-collapse').collapse('hide');
    let body = {
      FK_Zone_Id: this.f.ZMName.value,
      FK_State_Id: this.f.ASMName.value,
      AreaManager_Id: this.f.DealerName.value,
      PK_Resource_Id: this.f.SalesEngineer.value,
      StartDate:$('#StartDate').val(),
      EndDate:$('#EndDate').val(),
      Created_By: this.f.SalesEngineer.value
    };
    this.commonservice.SearchFilterWiseData(body)
    .subscribe(data => {
        this.GraphCountList = data;
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
              'yaxisname': 'Values',
              'aligncaptionwithcanvas': '0',
              'plottooltext': '<b>$dataValue</b>',
              'theme': 'fusion'
          },
           'data': this.GraphCountList.salesPhaseCount
         };
    });
    }






















}
