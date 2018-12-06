import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class visit {
  constructor(private http: HttpClient) { }

  visitsList(body) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/VisitList`, body);
  }

  DeleteVisits(PK_Visit) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/DeleteVisits?PK_Visit=` + PK_Visit, {});
  }

}
