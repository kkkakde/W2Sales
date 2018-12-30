import { Component, OnInit } from '@angular/core';
import {Resource} from '../_services';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-master-resource',
  templateUrl: './master-resource.component.html',
  styleUrls: ['./master-resource.component.css']
})
export class MasterResourceComponent implements OnInit {
  public ResourceList: any;
  public navigationExtras: any;
  key: string = 'name'; // set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private resourceservice: Resource,
    private router: Router,
    ) { }

  ngOnInit() {
      this.resourceservice.GetResourceList()
        .subscribe(data => {
          this.ResourceList = data;
        });
  }
  navigateToAddResource() {
    this.router.navigate(['/addResource']);
  }
  editResource(item) {
    this.navigationExtras = {
      queryParams: {
        PK_Resource_Id: item.PK_Resource_Id
      }
    };
    this.router.navigate(['/addResource'], this.navigationExtras);
  }
}
