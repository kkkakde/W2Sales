import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class Resource {
  constructor(private http: HttpClient) { }

  GetDesignationList() {
    return this.http.post(`${environment.apiUrl}Api_Common/GetDesignationList`, {});
  }
  GetResourceList() {
    return this.http.post(`${environment.apiUrl}Api_MasterResource/GetResourceList`, {});
  }
  addResourceDetails(body) {
    return this.http.post(`${environment.apiUrl}Api_MasterResource/addResourceDetails`, body);
  }
  GetZoneList() {
    return this.http.post(`${environment.apiUrl}Api_Common/GetZoneAllList`, {});
  }
  GetStateList(Zone_Id) {
    return this.http.post(`${environment.apiUrl}Api_Common/GetStateList?Zone_Id=` + Zone_Id, {});
  }
  ResourceList(PKResourceId) {
    return this.http.post(`${environment.apiUrl}Api_MasterResource/ResourceList?PK_Resource_Id=` + PKResourceId, {});
  }
}