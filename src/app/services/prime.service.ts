import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimeComponent } from '../dashboard/prime/prime.component';
import { Observable } from 'rxjs';
import { Prime } from '../dashboard/prime/primemodel.component';
@Injectable({
  providedIn: 'root'
})
export class PrimeService {

  private baseUrl =  'http://localhost:1014/stg/project.new_rate_index/api/prime'; 
 
  
  constructor(private http: HttpClient) {}

  addPrime(prime: Prime): Observable<Prime> {
    return this.http.post<Prime>(`${this.baseUrl}`, prime);
  }

}
