import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor,  } from './_helpers';
import { SegmentType, MappingType, SubRangeDetails, ProductDetails} from './_models';
import { AlertService, AuthenticationService, UserService, Customer, Opportunities, visit,
    Competitor, CommonService, ProductService , SubRangeMappingService, Resource, Master, NPSScores,
UserRoleService, SearchFilter} from './_services/';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MenubarComponent } from './menubar/menubar.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { DataTableModule} from 'angular-6-datatable';
import { OpportunitieslistComponent } from './opportunitieslist/opportunitieslist.component';
import { AddopportunitiesComponent } from './addopportunities/addopportunities.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VisitsComponent } from './visits/visits.component';
import { CalendarComponent } from './calendar/calendar.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; // importing the module

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';

// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MasterCompetitorComponent } from './master-competitor/master-competitor.component';
import { MasterProductComponent } from './master-product/master-product.component';
import { MasterRangeMappingComponent} from './master-range-mapping/master-range-mapping.component';
import { MasterResourceComponent} from './master-resource/master-resource.component';
import { AddResourceComponent} from './master-resource/add-resource.component';
import { MasterSubRangeMappingComponent} from './master-sub-range-mapping/master-sub-range-mapping.component';
import { AddIndustryComponent } from './master-industry/add-industry.component';
import { MasterIndustryComponent } from './master-industry/master-industry.component';
import { AddProductComponent} from './master-product/add-product.component';
import { AddSubRangeComponent } from './master-sub-range-mapping/add-subrange.component';
import { AddRangeMappingComponent } from './master-range-mapping/add-range-mapping.component';
import { MasterEnquirySourceComponent} from './master-enquiry-source/master-enquiry-source.component';
import { AddEnquirySourceComponent } from './master-enquiry-source/add-enquiry-source.component';
import { AddCompetitorComponent} from './master-competitor/add-competitor.component';
import { MasterEnquiryTypeComponent} from './master-enquiry-type/master-enquiry-type.component';
import { AddEnquiryTypeComponent} from './master-enquiry-type/add-enquiry-type.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NPSWonScoreComponent } from './npswon-score/npswon-score.component';
import { NPSLostScoreComponent } from './npslost-score/npslost-score.component';
import { UserRoleMappingComponent } from './user-role-mapping/user-role-mapping.component';
import { MasterRoleComponent } from './master-resource/master-role.component';
import { AddMasterRoleComponent } from './master-resource/add-role-component';
import { AddUserRoleMappingComponent } from './user-role-mapping/add-userRole-mapping.component';
import { AgmCoreModule } from '@agm/core';
// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, FintTheme);


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        DataTableModule,
        routing,
        NgxPaginationModule,
        Ng2OrderModule,
        Ng2SearchPipeModule , // including into imports
        FusionChartsModule,
        NgxSpinnerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAYv74bRujxn0wTupVthJtm4eJxVbsfYdo'
          }),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AddCustomerComponent ,
        MenubarComponent ,
        CustomerlistComponent ,
        OpportunitieslistComponent ,
        AddopportunitiesComponent,
        VisitsComponent,
        CalendarComponent,
        DashboardComponent,
        HomePageComponent,
        ChangepasswordComponent,
        MasterCompetitorComponent,
        ForgotpasswordComponent,
        MasterProductComponent,
        MasterRangeMappingComponent,
        MasterResourceComponent,
        AddResourceComponent,
        MasterSubRangeMappingComponent,
        AddProductComponent,
        AddSubRangeComponent,
        AddRangeMappingComponent,
        AddIndustryComponent,
        MasterIndustryComponent,
        MasterEnquirySourceComponent,
        AddEnquirySourceComponent,
        AddCompetitorComponent,
        MasterEnquiryTypeComponent,
        AddEnquiryTypeComponent,
        NPSWonScoreComponent,
        NPSLostScoreComponent,
        UserRoleMappingComponent,
        MasterRoleComponent,
        AddMasterRoleComponent,
        AddUserRoleMappingComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        Customer,
        UserService,
        Opportunities,
        visit,
        Competitor,
        SegmentType,
        MappingType,
        SubRangeDetails,
        ProductDetails,
        CommonService,
        ProductService ,
        Resource,
        Master,
        SubRangeMappingService,
        NPSScores,
        UserRoleService,
        SearchFilter,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}