import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class Customer {
    constructor(private http: HttpClient) { }
    getCustomerList() {
        return this.http.post(`${environment.apiUrl}Api_MasterCustomer/GetCustomerList`, {});
    }
}