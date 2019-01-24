import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRoleService} from '../_services/userRole.Service';
@Component({
  selector: 'master-role',
  templateUrl: './master-role.component.html',
  styleUrls: ['./master-role.component.css']
})
export class MasterRoleComponent implements OnInit {
  page: number ;
  filter: any;
  totalRec: number;
  public userRoleDetails : any;
  public navigationExtras : any;
  constructor(private Router: Router, private userRoleService: UserRoleService) { }

  ngOnInit() {
    this.userRoleService.getAllRoleDetails().subscribe(result => {
      this.userRoleDetails = result;
      console.log("", this.userRoleDetails);
    });
  }

  navigateToAddRole(){
    this.Router.navigate(['/addMasterRole']);
  }

  editRoleDetails(role){
    this.navigationExtras = {
      queryParams: {
        PK_Role_Id: role.PK_Role_Id,
        Name: role.Name,
        Description: role.Description,
        IsActive: role.IsActive,
      }
    };
    this.Router.navigate(['/addMasterRole'],this.navigationExtras);

  }

  
}
