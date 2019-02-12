import { Component, OnInit } from '@angular/core';
import { CommonService, SearchFilter} from '../_services';
import { FormGroup, FormBuilder} from '@angular/forms';
import { GraphObjectList } from '../_models/graph';
import { SalesPhaseStructure } from '../_models';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    type3 = 'bar2d';
    dataFormat3 = 'json';
    dataSource3 = {
        "chart": {
            "caption": "Revenue Won by Sales Representative",
            "captionFontSize": "16",
            "captionFont": "UniversLTStd",
            "captionFontBold": 0,
            "captionFontColor": "#0088bb",
            "yaxisname": "Revenue(INR)",
            "labelDisplay": "rotate",
            "slantLabel": "1",
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

    type5 = 'mscolumn2d';
    dataFormat5 = 'json';
    dataSource5 = {
        "chart": {
            "caption": "Won Loss Opportunity Value",
            "captionFontSize": "16",
            "captionFont": "UniversLTStd",
            "captionFontBold": 0,
            "captionFontColor": "#0088bb",
            //"subcaption": "2012-2016",
            "xaxisname": "Month",
            "yaxisname": "Revenue",
            "labelDisplay": "rotate",
            "slantLabel": "1",
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

    typeSR = 'doughnut2d';
    dataFormatSR = 'json';
    dataSourceSR = {
      "chart": {
        "caption": "Revenue owned by Sales Representative",
        "captionFontSize": "16",
          "captionFont": "UniversLTStd",
          "captionFontBold": 0,
          "captionFontColor": "#0088bb",
        //"subcaption": "For all users in 2017",
        "showpercentvalues": "1",
        "defaultcenterlabel": "Revenue by SR",
        "aligncaptionwithcanvas": "0",
        "captionpadding": "0",
        "decimals": "1",
        "plottooltext": "<b>$percentValue</b> own by <b>$label</b>",
        "centerlabel": "# Users: $value",
        "labelFontSize": "10",
        "theme": "fusion"
      },
      "data": [
        {
          "label": "Rajesh",
          "value": "7"
        },
        {
          "label": "Rahul",
          "value": "9"
        },
        {
          "label": "Raj",
          "value": "4"
        }
      ]
    };
  SerachForm: FormGroup;
  public  title: string = '';
  public getLatLongList: any;
  public DataList:any;
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
  public  GraphCountList: any;
  public chartConfig: object;
  graphObj: GraphObjectList = new GraphObjectList();
  public WonLossSummaryList:any;
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
            type: 'stackedcolumn2d',
            dataFormat: 'json',
         };
         this.graphObj.opportunityValueSummarychartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         }
         this.graphObj.opportunitiesbyStatuschartConfig = {
            width: '100%',
            height: '250',
            type: 'stackedcolumn2d',
            dataFormat: 'json',
         }
         this.graphObj.visitbyCategorychartConfig = {
            width: '100%',
            height: '250',
            type: 'stackedcolumn2d',
            dataFormat: 'json',
         }
         this.graphObj.WonLossOpportunityValuechartConfig = {
            width: '100%',
            height: '250',
            type: 'mscolumn2d',
            dataFormat: 'json',
         }
         this.graphObj.WonReasonchartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         }
         this.graphObj.LossReasonchartConfig = {
            width: '100%',
            height: '250',
            type: 'column2d',
            dataFormat: 'json',
         }
         this.graphObj.WonLossRatechartConfig = {
            width: '100%',
            height: '250',
            type: 'msline',
            dataFormat: 'json',
         }

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
        let body = {
         FK_Designation_Id: this.session.session.FK_Designation_Id ,
         FK_Zone_Id: this.session.session.FK_Zone_Id,
         Created_By: this.session.session.PK_Resource_Id,
         StartDate:'01-01-'+ new Date().getFullYear()+'',
         EndDate:'31-12-'+ new Date().getFullYear()+'',
         };
        this.commonservice.getDashboardData(body)
        .subscribe(data => {
        this.DataList = data;
        this.WonLossSummaryList = this.DataList.WonLossSummaryCount;
        this.getLatLongList = this.DataList.latlngCount;
        this.graphObj.visitdataSource = {
            'chart': {
                    'caption': 'Visits',
                    'captionFontSize': '16',
                    'captionFont': 'UniversLTStd',
                    'captionFontBold': 0,
                    'captionFontColor': '#0088bb',
                    'xaxisname': 'Month',
                    'yaxisname': 'No. of Visits',
                    'numbersuffix': '',
                    "labelDisplay": "rotate",
                    "slantLabel": "1",
                    'theme': 'fusion'
                },
            'data': this.DataList.visitCount
        };
        this.graphObj.opportunitydataSource = {
            'chart': {
                    'caption': 'Opportunities',
                    'captionFontSize': '16',
                    'captionFont': 'UniversLTStd',
                    'captionFontBold': 0,
                    'captionFontColor': '#0088bb',
                    'xaxisname': 'Month',
                    'yaxisname': 'No. of Opportunities',
                    'numbersuffix': '',
                    "labelDisplay": "rotate",
                    "slantLabel": "1",
                    'theme': 'fusion'
                },
            'data': this.DataList.opportunityCount
        };
        this.graphObj.salesPhasedataSource = {
           'chart': {
              'caption': 'Sales Phase',
              'captionFontSize': '16',
              'captionFont': 'UniversLTStd',
              'captionFontBold': 0,
              'captionFontColor': '#0088bb',
              'yaxisname': 'Values',
              "labelDisplay": "rotate",
              "slantLabel": "1",
              'aligncaptionwithcanvas': '0',
              'plottooltext': '<b>$dataValue</b>',
              'theme': 'fusion'
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
          "dataset": this.DataList.salesPhaseCount,
        };
        this.graphObj.opportunityValueSummarydataSource = {
            "chart": {
                "caption": "Opportunity Value Summary",
                "captionFontSize": "16",
                "captionFont": "UniversLTStd",
                "captionFontBold": 0,
                "captionFontColor": "#0088bb",
                //"subcaption": "In MMbbl = One Million barrels",
                "xaxisname": "Month",
                "yaxisname": "Revenue",
                "numbersuffix": "K",
                "labelDisplay": "rotate",
                "slantLabel": "1",
                "theme": "fusion"
            },
            "data":this.DataList.opportValueSummaryCount
        }
        this.graphObj.opportunitiesbyStatusdataSource = {
            "chart": {
                "caption": "Opportunities by Status",
                "captionFontSize": "16",
                "captionFont": "UniversLTStd",
                "captionFontBold": 0,
                "captionFontColor": "#0088bb",
                "labelDisplay": "rotate",
                "slantLabel": "1",
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
            "dataset": this.DataList.opportunitiesbyStatusCount,
        };
        this.graphObj.visitbyCategorydataSource = {
            "chart": {
                "caption": "Visit by Category",
                "captionFontSize": "16",
                "captionFont": "UniversLTStd",
                "captionFontBold": 0,
                "captionFontColor": "#0088bb",
                "labelDisplay": "rotate",
                "slantLabel": "1",
                "showsum": "0",
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
            "dataset": this.DataList.visitbyCategoryCount,
        };
        this.graphObj.WonLossOpportunityValuedataSource = {
            "chart": {
                "caption": "Won Loss Opportunity Value",
                "captionFontSize": "16",
                "captionFont": "UniversLTStd",
                "captionFontBold": 0,
                "captionFontColor": "#0088bb",
                //"subcaption": "2012-2016",
                "xaxisname": "Month",
                "yaxisname": "Revenue",
                "labelDisplay": "rotate",
                "slantLabel": "1",
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
            "dataset":'',
        }
        this.graphObj.WonReasondataSource = {
            "chart": {
                "caption": "Won Reason",
                "captionFontSize": "16",
                "captionFont": "UniversLTStd",
                "captionFontBold": 0,
                "captionFontColor": "#0088bb",
                //"subcaption": "In MMbbl = One Million barrels",
                "xaxisname": "Reason",
                "yaxisname": "No.of deals",
                "labelFontSize": "11",
                "labelDisplay": "rotate",
                "slantLabel": "1",
                //"numbersuffix": "K",
                "theme": "fusion"
            },
             "data":this.DataList.WonReasonCount,
        };
        this.graphObj.LossReasondataSource = {
            "chart": {
                "caption": "Loss Reason",
                "captionFontSize": "16",
                "captionFont": "UniversLTStd",
                "captionFontBold": 0,
                "captionFontColor": "#0088bb",
                //"subcaption": "In MMbbl = One Million barrels",
                "xaxisname": "Reason",
                "yaxisname": "No. of deals",
                "labelFontSize": "11",
                "labelDisplay": "rotate",
                "slantLabel": "1",
                //"numbersuffix": "K",
                "theme": "fusion"
            },
            "data":this.DataList.LossReasonCount,
        };
        this.graphObj.WonLossRatedataSource = {
            "chart": {
                "caption": "Won Loss Rate",
                "captionFontSize": "16",
                "captionFont": "UniversLTStd",
                "captionFontBold": 0,
                "captionFontColor": "#0088bb",
                "yaxisname": "Percentage(%)",
                //"subcaption": "2012-2016",
                "showhovereffect": "1",
                "numbersuffix": "",
                "drawcrossline": "1",
                "labelDisplay": "rotate",
                "slantLabel": "1",
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
            "dataset":this.DataList.wonLossRateCount,
        }
        });

        $('#StartDate').datepicker({
            startDate: new Date(),
            format: "dd-M-yyyy",
          });
          $('#EndDate').datepicker({
            startDate: new Date(),
            format: "dd-M-yyyy",
            defaultDate: new Date(),
            autoclose: true
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
    closepopup() {
        $('.panel-collapse').collapse('hide');
    }
    onSubmit() {
     this.GraphCountList='';
    //  var StartDate =new Date( $('#StartDate').val());
    //  var EndDate = new Date ($('#EndDate').val());
    //  if((StartDate.getFullYear()) !== (EndDate.getFullYear())) {
    //    alert('Please select same year date');
    //    return false;
    //     }
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
                    "labelDisplay": "rotate",
                    "slantLabel": "1",
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
                    "labelDisplay": "rotate",
                    "slantLabel": "1",
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
              "labelDisplay": "rotate",
              "slantLabel": "1",
              'plottooltext': '<b>$dataValue</b>',
              'theme': 'fusion'
          },
           'data': this.GraphCountList.salesPhaseCount
         };
    });
    }






















}
