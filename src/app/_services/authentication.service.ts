import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    login(username: string, password: string) {
        return this.http.post(`${environment.apiUrl}API_Login/Login?username=` + username + `&password=` + password, {});
    }
    getCustomerList() {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/GetCustomerList`, {});
    }
    GetZoneList() {
        return this.http.post(`${environment.apiUrl}Api_Common/GetZoneList`, {});
    }
    GetStateList(Zone_Id) {
        return this.http.post(`${environment.apiUrl}Api_Common/GetStateList?Zone_Id=` + Zone_Id , {});
    }
    GetCityList(State_Id) {
        return this.http.post(`${environment.apiUrl}Api_Common/GetCityList?State_Id=` + State_Id , {});
    }
    GetIndustryList() {
        return this.http.post(`${environment.apiUrl}Api_Common/GetIndustryList`, {});
    }
        logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}