import { Injectable } from '@angular/core';
import { Bsby } from '../rateform/bsby/bsbymodel.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BsbyService {
  private baseUrl =  'http://localhost:1014/stg/project.new_rate_index/api/bsby'; 
 
  constructor(private http: HttpClient) {}

  addBsby(bsby: Bsby): Observable<Bsby> {
    return this.http.post<Bsby>(`${this.baseUrl}`, bsby);
  }

  getBsbyByRateId(rateId:number):Observable<any> {
    return this.http.get<any>(this.baseUrl + `/rateid?rateId=${rateId}`)
    // http://localhost:1014/stg/project.new_rate_index/api/rateinfo/id?rateId=1
    }
    updateBsby(bsbyId:any,updatedBsby: Bsby): Observable<Bsby> {
      return this.http.post<Bsby>(`${this.baseUrl}`+ `?bsbyId=${bsbyId}`, updatedBsby);
    }
}
