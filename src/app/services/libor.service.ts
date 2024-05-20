import { Injectable } from '@angular/core';
import { Libor } from '../rateform/libor/libormodel.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiborService {

  private baseUrl =  'http://localhost:1014/stg/project.new_rate_index/api/libor'; 
 
  constructor(private http: HttpClient) {}

  addLibor(libor: Libor): Observable<Libor> {
    return this.http.post<Libor>(`${this.baseUrl}`, libor);
  }
  getLiborByRateId(rateId:number):Observable<any> {
    return this.http.get<any>(this.baseUrl + `/rateid?rateId=${rateId}`)
    // http://localhost:1014/stg/project.new_rate_index/api/rateinfo/id?rateId=1
    }

    updateLibor(liborId:number,updatedLibor:Libor){
      return this.http.put<any>(this.baseUrl + `?liborId=${liborId}`,updatedLibor)
    }
}
