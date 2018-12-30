import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class Master {
  constructor(private http: HttpClient) { }

  Get_Industry_List() {
    return this.http.post(`${environment.apiUrl}Api_Master/Get_Industry_List`, {});
  }
  AddIndustry(body) {
    return this.http.post(`${environment.apiUrl}Api_Master/AddIndustry`, body);
  }
  IndustryList(Industry_Id) {
    return this.http.post(`${environment.apiUrl}Api_Master/IndustryList?Industry_Id=` + Industry_Id, {});
  }
  EnquirySourceList() {
    return this.http.post(`${environment.apiUrl}Api_Master/EnquirySourceList`, {});
  }
  AddEnquirySource(body) {
    return this.http.post(`${environment.apiUrl}Api_Master/AddEnquirySource`, body);
  }
  EditEnquirySource(Enquiry_Source_Id) {
    return this.http.post(`${environment.apiUrl}Api_Master/EditEnquirySource?Enquiry_Source_Id=` + Enquiry_Source_Id, {});
  }
  EnquirytypeList() {
    return this.http.post(`${environment.apiUrl}Api_Master/EnquirytypeList`, {});
  }
  AddEnquirytypeList(body) {
    return this.http.post(`${environment.apiUrl}Api_Master/AddEnquirytypeList`, body);
  }
  EditEnquiryType(Enquiry_Type_Id) {
    return this.http.post(`${environment.apiUrl}Api_Master/EditEnquiryType?Enquiry_Type_Id=` + Enquiry_Type_Id, {});
  }
}