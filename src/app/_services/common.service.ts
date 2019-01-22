import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { SegmentType, MappingType, Menulist, } from '../_models';

import 'rxjs/add/operator/map';
import { Body } from '@angular/http/src/body';
@Injectable()
export class CommonService {
    constructor(private http: HttpClient) { }
    getSegmentList() {
        // return this.http.get<Product[]>(`${environment.apiUrl}/users`);
        return this.http.get<SegmentType[]>(`${environment.apiUrl}Api_Common/GetSegmentList`, {});
    }
    getMappingTypes() {
        return this.http.get<MappingType[]>(`${environment.apiUrl}Api_Common/GetMappingType`, {});
    }
    getRangeTypes() {
        return this.http.get<MappingType[]>(`${environment.apiUrl}Api_Common/GetRangeType`, {});
    }
    GetMenuList(body) {
        return this.http.post<Menulist[]>(`${environment.apiUrl}MenuMaster/GetMenuList`, body);
    }
    getZoneList() {
        return this.http.post(`${environment.apiUrl}Api_Common/GetZoneAllList`, {});
    }
    getStateList(Zone_Id) {
        return this.http.post(`${environment.apiUrl}Api_Common/GetStateList?Zone_Id=` + Zone_Id, {});
    }
    getUserDetails() {
        let url = `${environment.apiUrl}Api_Common/GetUserDetails`
        return this.http
          .get(url)
          .map((result: Response) => result);
    }
    getLatLongList(body) {
        return this.http.post(`${environment.apiUrl}Api_Common/getLatLongList` , body);
    }
    getCount(body) {
        return this.http.post(`${environment.apiUrl}Api_Dashboard/DashboardCount` , body);
    }
    SearchFilterWiseData(body) {
        return this.http.post(`${environment.apiUrl}Api_Dashboard/DashboardCount`, body);
    }
}
