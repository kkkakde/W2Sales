import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { AddopportunitiesComponent } from './addopportunities/addopportunities.component';
import { OpportunitieslistComponent } from './opportunitieslist/opportunitieslist.component';
import { VisitsComponent } from './visits/visits.component';
import { CalendarComponent } from './calendar/calendar.component';

import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';

import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {MasterCompetitorComponent} from './master-competitor/master-competitor.component';

import { MasterProductComponent } from './master-product/master-product.component';
import { MasterRangeMappingComponent} from './master-range-mapping/master-range-mapping.component';
import { MasterResourceComponent} from './master-resource/master-resource.component';
import { MasterSubRangeMappingComponent} from './master-sub-range-mapping/master-sub-range-mapping.component';
import { AddResourceComponent} from './master-resource/add-resource.component';
import { AddProductComponent} from './master-product/add-product.component';
import { AddSubRangeComponent } from './master-sub-range-mapping/add-subrange.component';
import { AddRangeMappingComponent } from './master-range-mapping/add-range-mapping.component';
import { AddIndustryComponent } from './master-industry/add-industry.component';
import { MasterIndustryComponent } from './master-industry/master-industry.component';
import { MasterEnquirySourceComponent } from './master-enquiry-source/master-enquiry-source.component';
import { AddEnquirySourceComponent } from './master-enquiry-source/add-enquiry-source.component';
import { AddCompetitorComponent } from './master-competitor/add-competitor.component';
import { MasterEnquiryTypeComponent } from './master-enquiry-type/master-enquiry-type.component';
import {  AddEnquiryTypeComponent} from './master-enquiry-type/add-enquiry-type.component';
import { MasterRoleComponent } from './master-resource/master-role.component';
// import { AddMasterRoleComponent } from './master-resource/add-role.component';
import { UserRoleMappingComponent } from './user-role-mapping/user-role-mapping.component';
import { AddUserRoleMappingComponent } from './user-role-mapping/add-userRole-mapping.component';

import { from } from 'rxjs';
import { NPSLostScoreComponent } from './npslost-score/npslost-score.component';
import { NPSWonScoreComponent } from './npswon-score/npswon-score.component';
import { NpsSurveyQuestionComponent } from './nps-survey-question/nps-survey-question.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent  , canActivate: [AuthGuard] },
    { path: 'addcustomer', component: AddCustomerComponent  , canActivate: [AuthGuard]},
    { path: 'customerlist', component: CustomerlistComponent , canActivate: [AuthGuard]},
    { path: 'opportunitieslist', component: OpportunitieslistComponent  , canActivate: [AuthGuard]},
    { path: 'addopportunities', component: AddopportunitiesComponent  , canActivate: [AuthGuard]},
    { path: 'visits' , component: VisitsComponent  , canActivate: [AuthGuard]},
    { path: 'calendar', component: CalendarComponent  , canActivate: [AuthGuard]},
    { path: 'dashboard', component: DashboardComponent  , canActivate: [AuthGuard]},
    { path: 'homepage', component: HomePageComponent  , canActivate: [AuthGuard] },
    { path: 'forgotpassword', component: ForgotpasswordComponent },
    { path: 'Changepassword', component: ChangepasswordComponent , canActivate: [AuthGuard] } ,
    { path: 'masterCompetitor', component: MasterCompetitorComponent , canActivate: [AuthGuard]},
    { path: 'masterProduct', component: MasterProductComponent , canActivate: [AuthGuard]},
    { path: 'masterRangeMapping' , component: MasterRangeMappingComponent , canActivate: [AuthGuard] },
    { path: 'masterResource' , component: MasterResourceComponent , canActivate: [AuthGuard]},
   // { path: 'masterResourceRoleMapping' , component: MasterResourceRoleMappingComponent , canActivate: [AuthGuard]},
    { path: 'masterSubRangeMapping' , component: MasterSubRangeMappingComponent , canActivate: [AuthGuard]},
    { path: 'addProduct' , component: AddProductComponent , canActivate: [AuthGuard]},
    { path: 'addResource', component: AddResourceComponent , canActivate: [AuthGuard]},
    { path: 'addSubRange' , component: AddSubRangeComponent , canActivate: [AuthGuard]},
    { path: 'addRangeMapping' , component: AddRangeMappingComponent , canActivate: [AuthGuard]},
    { path: 'addIndustry', component: AddIndustryComponent,  canActivate: [AuthGuard]},
    { path: 'masterIndustry', component: MasterIndustryComponent, canActivate: [AuthGuard]},
    { path: 'masterEnquirySource', component: MasterEnquirySourceComponent , canActivate: [AuthGuard]},
    { path: 'addEnquirySource', component: AddEnquirySourceComponent , canActivate: [AuthGuard]},
    { path: 'addCompetitor', component: AddCompetitorComponent , canActivate: [AuthGuard]},
    { path: 'masterEnquiryType', component: MasterEnquiryTypeComponent , canActivate: [AuthGuard]},
    { path: 'addEnquiryType', component: AddEnquiryTypeComponent , canActivate: [AuthGuard]},
    { path: 'npsLostScores', component: NPSLostScoreComponent , canActivate: [AuthGuard]},
    { path: 'npsWonScores', component: NPSWonScoreComponent , canActivate: [AuthGuard]},
    { path: 'masterRole' , component: MasterRoleComponent , canActivate: [AuthGuard]},
    {path: 'npssurveyquestion', component: NpsSurveyQuestionComponent},
    // { path: 'addMasterRole' , component: AddMasterRoleComponent , canActivate: [AuthGuard]},
    { path: 'userRoleMapping' , component: UserRoleMappingComponent , canActivate: [AuthGuard]},
    { path: 'addUserRoleMapping' , component: AddUserRoleMappingComponent , canActivate: [AuthGuard]},
    { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes, { useHash: true} ) ;