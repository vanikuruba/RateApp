import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimeComponent } from '../rateform/prime/prime.component';
import { Observable } from 'rxjs';
import { Prime } from '../rateform/prime/primemodel.component';
@Injectable({
  providedIn: 'root'
})
export class PrimeService {

  private baseUrl =  "http://localhost:1014/stg/project.new_rate_index/api/prime"; 
 
  
  constructor(private http: HttpClient) {}

  addPrime(prime: Prime): Observable<Prime> {
    console.log(prime)
    return this.http.post<Prime>(`${this.baseUrl}`, prime);
  }
  getPrimeByRateId(rateId:number):Observable<any> {
    return this.http.get<any>(this.baseUrl + `/rateid?rateId=${rateId}`)
    // http://localhost:1014/stg/project.new_rate_index/api/rateinfo/id?rateId=1
    }

    updatePrime(primeId:number,updatedPrime: Prime){
      return this.http.put<any>(this.baseUrl + `?primeId=${primeId}`,updatedPrime)

    }

}
