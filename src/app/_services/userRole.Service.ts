import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

// import { ProductDetails } from '../_models';
import 'rxjs/add/operator/map';
@Injectable()
export class UserRoleService {
    constructor(private http: HttpClient) { }

    getAllRoleDetails() {
        let url = `${environment.apiUrl}MasterRole/GetRoleDetails`
        return this.http
          .get(url)
          .map((result: Response) => result);
    }

    addRoleDetails(param):Observable<any>{
        let url = `${environment.apiUrl}MasterRole/AddRoleDetails`
        return this.http
          .post(url, param)
          .map((result: Response) => result);
    }

    updateRoleDetails(param):Observable<any>{
        let url = `${environment.apiUrl}MasterRole/UpdateRoleDetails`
        return this.http
          .post(url, param)
          .map((result: Response) => result);
    }


    getUserRoleMappingDetails() {
        let url = `${environment.apiUrl}MasterRole/GetUserRoleDetails`
        return this.http
          .get(url)
          .map((result: Response) => result);
    }

    addUserRoleMappingDetails(param):Observable<any>{
        let url = `${environment.apiUrl}MasterRole/AddUserRoleDetails`
        return this.http
          .post(url, param)
          .map((result: Response) => result);
    }

    updateUserRoleMappingDetails(param):Observable<any>{
        let url = `${environment.apiUrl}MasterRole/UpdateUserRoleDetails`
        return this.http
          .post(url, param)
          .map((result: Response) => result);
    }

}