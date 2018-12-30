import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class NPSScores {
  constructor(private http: HttpClient) { }
  WonList(body) {
    return this.http.post(`${environment.apiUrl}Api_NPSSource/WonList`, body);
  }
  Lostlist(body) {
    return this.http.post(`${environment.apiUrl}Api_NPSSource/LostList`, body);
  }
}