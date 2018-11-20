import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-master-absent',
  templateUrl: './master-absent.component.html',
  styleUrls: ['./master-absent.component.css']
})
export class MasterAbsentComponent implements OnInit {

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
  $('.datepicker2').datepicker({
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
