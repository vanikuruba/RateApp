import { Injectable } from '@angular/core';
import { Bsby } from '../dashboard/bsby/bsbymodel.component';
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
}
