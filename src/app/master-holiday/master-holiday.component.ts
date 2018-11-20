import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-master-holiday',
  templateUrl: './master-holiday.component.html',
  styleUrls: ['./master-holiday.component.css']
})
export class MasterHolidayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.datepicker1').datepicker({
      format: 'dd-M-yyyy',
      startDate: new Date(),
      setDate: new Date(),
      endDate: '+' + 2 + 'y',
      autoclose: true, todayHighlight: true,
      allowInputToggle: true,
      clearBtn: true,
  });
  }

}
