import { Component, OnInit } from '@angular/core';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
public UserId: string;
public UserName: string;
public Designation: string;
public session: any;
  constructor() { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.UserName = this.session.session.Resource_Name;
    this.Designation = this.session.session.Designation_Desc;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }

}
