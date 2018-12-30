import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class Competitor {
  constructor(private http: HttpClient) { }

  Get_Competitor_Type_List() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Competitor_Type_List`, {});
  }
  GetCompetitorList() {
    return this.http.post(`${environment.apiUrl}Api_MasterCompetitor/GetCompetitorList`, {});
  }
  AddCompetitor(body) {
    return this.http.post(`${environment.apiUrl}Api_MasterCompetitor/AddCompetitor`, body);
  }
  editCompetitor(PK_Competitor_Id) {
    return this.http.post(`${environment.apiUrl}Api_MasterCompetitor/EditCompetitor?PK_Competitor_Id=` + PK_Competitor_Id, {});
  }
}

