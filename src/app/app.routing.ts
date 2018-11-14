import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { AddopportunitiesComponent } from './addopportunities/addopportunities.component';
import { OpportunitieslistComponent } from './opportunitieslist/opportunitieslist.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'addcustomer', component: AddCustomerComponent},
    {path: 'customerlist', component: CustomerlistComponent},
    {path: 'addopportunities', component: AddopportunitiesComponent},
    {path: 'opportunitieslist', component: OpportunitieslistComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes, { useHash: true} ) ;