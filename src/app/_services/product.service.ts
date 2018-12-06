import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { ProductDetails } from '../_models';
import 'rxjs/add/operator/map';
@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    
    getAllProducts() {
        // return this.http.get<Product[]>(`${environment.apiUrl}/users`);
        return this.http.get<ProductDetails[]>(`${environment.apiUrl}Product/GetProductList`, {});
    }

    getAllProductsDetails() {
        let url = `${environment.apiUrl}Product/GetProductList`
        return this.http
          .get(url)
          .map((result: Response) => result.json());
    }

    addProductDetails(param):Observable<any>{
        let url = `${environment.apiUrl}Product/SubmitProductDetails`
        return this.http
          .post(url, param)
          .map((result: Response) => result);
    }

    updateProductDetails(param):Observable<any>{
        let url = `${environment.apiUrl}Product/updateProductDetails`
        return this.http
          .post(url, param)
          .map((result: Response) => result);
    }

}