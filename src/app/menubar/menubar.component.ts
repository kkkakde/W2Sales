import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services';
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
public MenuList: any;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.UserName = this.session.session.Resource_Name;
    this.Designation = this.session.session.Designation_Desc;
    this.getMenuList();
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }
  getMenuList() {
    const body = {
      FK_Designation_Id: this.session.session.FK_Designation_Id
    };
    this.commonService.GetMenuList(body)
    .subscribe(data => {
      this.MenuList = data;
    });
  }

}
