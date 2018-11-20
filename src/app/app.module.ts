import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, Customer, Opportunities } from './_services/';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MenubarComponent } from './menubar/menubar.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { DataTableModule} from 'angular-6-datatable';
import { OpportunitieslistComponent } from './opportunitieslist/opportunitieslist.component';
import { AddopportunitiesComponent } from './addopportunities/addopportunities.component';
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
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTableModule,
        routing,
        NgxPaginationModule
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
        MasterCompetitorComponent,
        MasterEnquirySourceComponent,
        MasterEnquiryTypeComponent,
        MasterHolidayComponent,
        MasterIndustryComponent,
        MasterNavigationComponent,
        MasterNavigationRoleMappingComponent,
        MasterProductComponent,
        MasterRangeMappingComponent,
        MasterResourceComponent,
        MasterResourceRoleMappingComponent,
        MasterSubRangeMappingComponent,
        MasterAbsentComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        Customer,
        UserService,
        Opportunities,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }