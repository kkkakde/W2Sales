import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-opportunitieslist',
  templateUrl: './opportunitieslist.component.html',
  styleUrls: ['./opportunitieslist.component.css']
})
export class OpportunitieslistComponent implements OnInit {
public opportunitieslistdata={};
  constructor( private AuthenticationService:AuthenticationService) { }

  ngOnInit() {
    this.AuthenticationService.GetOpportunitiesList()
              .subscribe(
                data =>  {
                  this.opportunitieslistdata = data;
                    console.log(this.opportunitieslistdata);
                },
                error => {
                    alert('Invalid User');
                });
  }

}
