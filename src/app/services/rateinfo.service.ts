import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateinfoService {

  
  constructor(private http: HttpClient) { }

 mainUrl = 'http://localhost:1014/stg/project.new_rate_index/api/rateinfo';
  // getUrl = 'http://localhost:1014/posts'


  createUser(postData: any): Observable<Object> {
   console.log(postData)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    


    // Include headers in the HTTP request
    return this.http.post<Object>(this.mainUrl + `/Register`, postData, { headers });
  }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.mainUrl);
  }

  getRates(pagenumber: any , offset: any,field: any):Observable<any[]> {
    return this.http.get<any[]>(this.mainUrl + `/paginationAndSort/?offset=${offset}&pageSize=${pagenumber}&field=${field}`)
  }
}
