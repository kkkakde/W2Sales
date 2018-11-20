import { Component, OnInit } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';


@Component({
  selector: 'app-master-navigation-role-mapping',
  templateUrl: './master-navigation-role-mapping.component.html',
  styleUrls: ['./master-navigation-role-mapping.component.css']
})
export class MasterNavigationRoleMappingComponent implements OnInit {

  nodes = [
    {
      name: 'root1'
    },
    {
      name: 'root2',
      children: [
        { name: 'child1' },
        { name: 'child2', children: [
          { name: 'grandchild1' },
          { name: 'grandchild2' }
        ] }
      ]
    }
  ];

  options: ITreeOptions = {
    useCheckbox: true
  };

  optionsDisabled: ITreeOptions = {
    useCheckbox: true,
    useTriState: false
  };


  constructor() { }



  public show: Boolean = false;
  public iconName: any = 'fa-plus';
  ngOnInit() {
  }
  toggle() {
    this.show = !this.show;

    if (this.show) {
      this.iconName = 'fa-minus';
    } else {
      this.iconName = 'fa-plus';
    }

  }


}
