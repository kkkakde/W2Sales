import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
public customerlistdata = {};
  constructor(  private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getCustomerList()
            .subscribe(
                data =>  {
                  this.customerlistdata = data;
                    console.log(this.customerlistdata);
                },
                error => {
                    alert('Invalid User');
                });
  }

}
