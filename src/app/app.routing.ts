import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { AddopportunitiesComponent } from './addopportunities/addopportunities.component';
import { OpportunitieslistComponent } from './opportunitieslist/opportunitieslist.component';
import { MasterAbsentComponent} from './master-absent/master-absent.component';
import { MasterCompetitorComponent } from './master-competitor/master-competitor.component';
import { MasterEnquirySourceComponent} from './master-enquiry-source/master-enquiry-source.component';
import { MasterEnquiryTypeComponent } from './master-enquiry-type/master-enquiry-type.component';
import { MasterHolidayComponent} from './master-holiday/master-holiday.component';
import { MasterIndustryComponent } from './master-industry/master-industry.component';
import { MasterNavigationComponent} from './master-navigation/master-navigation.component';
import { MasterNavigationRoleMappingComponent} from './master-navigation-role-mapping/master-navigation-role-mapping.component';
import { MasterProductComponent } from './master-product/master-product.component';
import { MasterRangeMappingComponent} from './master-range-mapping/master-range-mapping.component';
import { MasterResourceComponent} from './master-resource/master-resource.component';
import { MasterResourceRoleMappingComponent } from './master-resource-role-mapping/master-resource-role-mapping.component';
import { MasterSubRangeMappingComponent} from './master-sub-range-mapping/master-sub-range-mapping.component';



const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'addcustomer', component: AddCustomerComponent},
    { path: 'customerlist', component: CustomerlistComponent},
    { path: 'opportunitieslist', component: OpportunitieslistComponent},
    { path: 'addopportunities', component: AddopportunitiesComponent},
    { path: 'masterAbsent' , component: MasterAbsentComponent},
    { path: 'masterCompetitor' , component: MasterCompetitorComponent },
    { path: 'masterEnquirySource' , component: MasterEnquirySourceComponent },
    { path: 'masterEnquiryType' , component: MasterEnquiryTypeComponent},
    { path: 'masterHoliday' , component: MasterHolidayComponent},
    { path: 'masterIndustry' , component: MasterIndustryComponent },
    { path: 'masterNavigation' , component: MasterNavigationComponent },
    { path: 'masterNavigationRoleMapping' , component: MasterNavigationRoleMappingComponent },
    { path: 'masterProduct' , component: MasterProductComponent},
    { path: 'masterRangeMapping' , component: MasterRangeMappingComponent },
    { path: 'masterResource' , component: MasterResourceComponent},
    { path: 'masterResourceRoleMapping' , component: MasterResourceRoleMappingComponent},
    { path: 'masterSubRangeMapping' , component: MasterSubRangeMappingComponent},


    { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes, { useHash: true} ) ;