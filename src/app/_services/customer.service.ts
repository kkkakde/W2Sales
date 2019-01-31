import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { identity } from 'rxjs';

@Injectable()
export class Customer {
  constructor(private http: HttpClient) { }
  // Customer List
  getCustomerList(body) {
    return this.http.post(`${environment.apiUrl}Api_MasterCustomer/GetCustomerList`, body);
  }
  GetUpdateustomerList(body) {
    return this.http.post(`${environment.apiUrl}Api_MasterCustomer/GetCustomerDetailsList`, body);
  }
  // Add CUstomer
  GetZoneList() {
    return this.http.post(`${environment.apiUrl}Api_Common/GetZoneAllList`, {});
  }
  GetStateList(Zone_Id) {
    return this.http.post(`${environment.apiUrl}Api_Common/GetStateList?Zone_Id=` + Zone_Id, {});
  }
  GetCityList(State_Id) {
    return this.http.post(`${environment.apiUrl}Api_Common/GetCityList?State_Id=` + State_Id, {});
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
  DeleteCompressorRoomList(body) {
    return this.http.post(`${environment.apiUrl}Api_MasterCustomer/DeleteCustomerCompressorDetail`, body);
  }
  DeleteContactDetailsList(body) {
    return this.http.post(`${environment.apiUrl}Api_MasterCustomer/DeleteCustomerContactPersonDetail`, body);
  }
  VisitOut(body) {
    return this.http.post(`${environment.apiUrl}Api_MasterCustomer/VisitInOut`, body);
  }
  UpdateCustContactPerson(body) {
    return this.http.post(`${environment.apiUrl}Api_MasterCustomer/UpdateCustContactPerson`, body);
  }
  UploadVisitCard(body) {
    const fd = new FormData();
    fd.append('file', body);
    return this.http.post(`${environment.apiUrl}Uploading/VisitingCard`,
    fd,
    );
  }
  CheckOpportunity(PK_Cust_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/CheckOpportunity?PK_Cust_Id=` + PK_Cust_Id, {});
  }
  AddCustomerRemark(body) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/AddCustomerRemark`, body);
  }
}
