import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    // Login
    login(username: string, password: string) {
        return this.http.post(`${environment.apiUrl}API_Login/Login?username=` + username + `&password=` + password, {});
    }

    // Customer List
    getCustomerList() {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/GetCustomerList`, {});
    }

    // Add CUstomer
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
    SubmitCustomerDetails(body) {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/SubmitCustomerDetails`, body);
    }
    GetRoomDetailsList() {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/Get_Room_Details_List`, {});
    }
    GetWorkigStatus() {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/Get_working_status_compressor`, {});
    }
    SubmitRoomDetails(body) {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/SubmitCustCompressorRoom`, body);
    }
    GetCompressorRoomDetails(id) {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/GetCompressorRoomDetails?FK_Cust_Id=` + id, {});
    }
    GetContactDesignationList() {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/Get_Contact_Designation_List`, {});
    }
    SubmitCustContactPerson(body) {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/SubmitCustContactPerson`, body);
    }
    GetContactDetailsList(id) {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/GetContactPersonDetails?FK_Cust_Id=` + id, {});
    }
    // Opportunity List
    GetOpportunitiesList() {
        return this.http.post(`${environment.apiUrl}Api_Opportunity/GetOpportunityList`, {});
    }
    // Add Opportunity
    getOpportunitySourceList() {
        return this.http.post(`${environment.apiUrl}Api_Opportunity/GetOpportunitySourceList`, {});
    }
    getOpportunityTypeList() {
        return this.http.post(`${environment.apiUrl}Api_Opportunity/GetOpportunityTypeList`, {});
    }
    getChanceofSuccessList() {
        return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Chance_Of_Success`, {});
    }
    getSalesPhaseList() {
        return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Sales_Phase`, {});
    }
    getStatusList() {
        return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Status`, {});
    }
        logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}