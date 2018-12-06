import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { SubRangeDetails } from '../_models/segmentType';

import 'rxjs/add/operator/map';
@Injectable()
export class SubRangeMappingService {
    constructor(private http: HttpClient) { }
    
    getSubRangeDetails() {
        return this.http.get<SubRangeDetails[]>(`${environment.apiUrl}RangeMapping/GetSubRangeDetails`, {});
    }

    // getAllProductsDetails() {
    //     let url = `${environment.apiUrl}Product/GetProductList`
    //     return this.http
    //       .get(url)
    //       .map((result: Response) => result.json());
    // }

    addSubRange(param):Observable<any>{
        let url = `${environment.apiUrl}RangeMapping/SubmitSubRangeDetails`
        return this.http
          .post(url, param)
          .map((result: Response) => result);
    }

    updateSubRangeDetails(param):Observable<any>{
        let url = `${environment.apiUrl}RangeMapping/UpdateSubRangeDetails`
        return this.http
          .post(url, param)
          .map((result: Response) => result);
    }

    AddRangeMapping(param):Observable<any>{
        let url = `${environment.apiUrl}RangeMapping/AddRangeMapping`
        return this.http
          .post(url, param)
          .map((result: Response) => result);
    }
    
    getRangeMappingDetails() {
        let url = `${environment.apiUrl}RangeMapping/GetRangeMappingDetails`
        return this.http
          .get(url)
          .map((result: Response) => result);
    }
    
}