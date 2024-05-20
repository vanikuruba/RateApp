import { Injectable } from '@angular/core';
import { Sofr } from '../rateform/sofr/sofrmodel.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SofrService {
  private baseUrl =  'http://localhost:1014/stg/project.new_rate_index/api/sofr'; 
 
  constructor(private http: HttpClient) {}

  addSofr(sofr: Sofr): Observable<Sofr> {
    return this.http.post<Sofr>(`${this.baseUrl}`, sofr);
  }
  getSofrByRateId(rateId:number):Observable<any> {
    return this.http.get<any>(this.baseUrl + `/rateid?rateId=${rateId}`)
    // http://localhost:1014/stg/project.new_rate_index/api/rateinfo/id?rateId=1
    }

    updateSofr(sofrId:number,updatedSofr:Sofr){
      return this.http.put<any>(this.baseUrl +`?sofrId=${sofrId}`,updatedSofr)
    }
}
