import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    // first
    type1 = 'bar2d';
    dataFormat1 = 'json';
    dataSource1 = {
        "chart": {
            "caption": "Sales Phase",
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
                "label": "Qualification",
                "value": "48"
            },
            {
                "label": "Proposal",
                "value": "39"
            },
            {
                "label": "Negotiation",
                "value": "28"
            }
        ]
      };
    // second
    type2 = 'column2d';
    dataFormat2 = 'json';
    dataSource2 = {
        "chart": {
            "caption": "Revenue Summary",
            "captionFontSize": "16",
            "captionFont": "UniversLTStd",
            "captionFontBold": 0,
            "captionFontColor": "#0088bb",
            // "subcaption": "In MMbbl = One Million barrels",
            "xaxisname": "Month",
            "yaxisname": "Revenue",
            "numbersuffix": "K",
            "theme": "fusion"
        },
        "data": [
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
    // third
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
    // fourth
    type4 = 'msline';
    dataFormat4 = 'json';
    dataSource4 = {
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
    // fifth
    type5 = 'mscolumn2d';
    dataFormat5 = 'json';
    dataSource5 = {
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
    // sixth
    type6 = 'column2d';
    dataFormat6 = 'json';
    dataSource6 = {
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
    // seventh
    type7 = 'stackedcolumn2d';
    dataFormat7 = 'json';
    dataSource7 = {
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
    // eighth
    type8 = 'stackedcolumn2d';
    dataFormat8 = 'json';
    dataSource8 = {
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


  constructor() {

  }

  ngOnInit() {

  }

}
