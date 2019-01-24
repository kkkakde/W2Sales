import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRoleService} from '../_services/userRole.Service';
@Component({
  selector: 'user-role-mapping',
  templateUrl: './user-role-mapping.component.html',
  styleUrls: ['./user-role-mapping.component.css']
})
export class UserRoleMappingComponent implements OnInit {
  page: number ;
  filter: any;
  totalRec: number;
  public userRoleMapping: any;
  public navigationExtras: any;
  constructor(private router: Router, private userRoleService: UserRoleService) { }

  ngOnInit() {
    this.userRoleService.getUserRoleMappingDetails().subscribe(result => {
      this.userRoleMapping = result;
      // console.log("", this.userRoleMapping);
    });
  }
  navigateToAddUserRole(){
     this.router.navigate(['/addUserRoleMapping']);
  }
  editUserRoleDetails(userRole){
    this.navigationExtras = {
      queryParams: {
        PK_UserRole_Id: userRole.PK_UserRole_Id,
        FK_User_Id: userRole.FK_User_Id,
        FK_Role_Id: userRole.FK_Role_Id,
        FK_Zone_Id: userRole.FK_Zone_Id,
        FK_State_Id: userRole.FK_State_Id,
        IsActive: userRole.IsActive,
      }
    };
    this.router.navigate(['/addUserRoleMapping'], this.navigationExtras);

  }
}
