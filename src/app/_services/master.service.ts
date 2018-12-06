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
    alert(Industry_Id);
    return this.http.post(`${environment.apiUrl}Api_Master/IndustryList?Industry_Id=` + Industry_Id, {});
  }
}