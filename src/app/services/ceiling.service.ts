import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ceiling } from '../rateform/ceiling/ceilingmodel.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CeilingService {

  private baseUrl =  'http://localhost:1014/stg/project.new_rate_index/api/ceiling'; 
 
  constructor(private http: HttpClient) {}

  addCeiling(ceiling: Ceiling): Observable<Ceiling> {
    return this.http.post<Ceiling>(`${this.baseUrl}`, ceiling);


  }

  getCeilingByRateId(rateId:number):Observable<any> {
    return this.http.get<any>(this.baseUrl + `/rateid?rateId=${rateId}`)
    // http://localhost:1014/stg/project.new_rate_index/api/rateinfo/id?rateId=1
    }

    updateCeiling(ceilingId:number,updatedCeiling:Ceiling){
      return this.http.put<any>(this.baseUrl + `?ceilingId=${ceilingId}`,updatedCeiling)
    }
}
