import { Injectable } from '@angular/core';
import { Libor } from '../dashboard/libor/libormodel.component';
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
}
