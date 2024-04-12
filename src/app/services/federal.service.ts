import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Federal } from '../rateform/federal/federalmodel.component';

@Injectable({
  providedIn: 'root'
})
export class FederalService {

  private baseUrl =  'http://localhost:1014/stg/project.new_rate_index/api/federalfunds'; 
 
  constructor(private http: HttpClient) {}

  addFederal(federal: Federal): Observable<Federal> {
    return this.http.post<Federal>(`${this.baseUrl}`, federal);


  }
}
