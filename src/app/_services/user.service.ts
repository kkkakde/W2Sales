import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/` + id);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/` + id);
  }
  GetBLMDetails() {
    return this.http.post(`${environment.apiUrl}/Api_SearchFilter/GetBLMDetails`, { });
  }
  GetZMDetails() {
    return this.http.post(`${environment.apiUrl}/Api_SearchFilter/GetZMDetails`, { });
  }
  GetASMDetails(Zone_Id) {
    return this.http.post(`${environment.apiUrl}/Api_SearchFilter/GetASMDetails?FK_Zone_Id=` + Zone_Id , { });
  }
  GetDealerDetails(body) {
    return this.http.post(`${environment.apiUrl}/Api_SearchFilter/GetDealerDetails`, body);
  }
  GetSalesEngineerDetails(body) {
    return this.http.post(`${environment.apiUrl}/Api_SearchFilter/GetSalesEngineerDetails`, body);
  }
  SearchData(body) {
    return this.http.post(`${environment.apiUrl}/Api_SearchFilter/SearchData`, body);
  }
}
