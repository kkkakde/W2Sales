import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { identity } from 'rxjs';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    // Login
    login(username: string, password: string) {
        return this.http.post(`${environment.apiUrl}API_Login/Login?username=` + username + `&password=` + password, {});
    }
        logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}