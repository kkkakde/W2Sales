import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { SegmentType, MappingType } from '../_models';

import 'rxjs/add/operator/map';
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
    // getAllProductsDetails() {
    //     let url = `${environment.apiUrl}Product/GetProductList`
    //     return this.http
    //       .get(url)
    //       .map((result: Response) => result.json());
    // }

    // addProductDetails(param):Observable<any>{
    //     let url = `${environment.apiUrl}Product/SubmitProductDetails`
    //     return this.http
    //       .post(url, param)
    //       .map((result: Response) => result);
    // }

    // updateProductDetails(param):Observable<any>{
    //     let url = `${environment.apiUrl}Product/updateProductDetails`
    //     return this.http
    //       .post(url, param)
    //       .map((result: Response) => result);
    // }

}