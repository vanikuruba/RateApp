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

  createRateInfo(rateData: any): Observable<Object> {
    // console.log(rateData)
     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     
 
 
     // Include headers in the HTTP request
     return this.http.post<Object>(this.mainUrl , rateData, { headers });
   }
  createRateInfoWithAttachments(rateData: any): Observable<Object> {
   console.log(rateData.value)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Include headers in the HTTP request
    return this.http.post<Object>(this.mainUrl + `/images`, rateData);
  }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.mainUrl);
  }

  getRates(pagenumber: any , offset: any,field: any):Observable<any[]> {
    return this.http.get<any[]>(this.mainUrl + `/paginationAndSort/?offset=${offset}&pageSize=${pagenumber}&field=${field}`)
  }

  getRateById(rateId:number):Observable<any> {
  return this.http.get<any>(this.mainUrl + `/id?rateId=${rateId}`)
  // http://localhost:1014/stg/project.new_rate_index/api/rateinfo/id?rateId=1
  }


  updateRateInfo(rateId:number , rateData: any,userId:number):Observable<any> {
    console.log(rateId )
    return this.http.put<any>(this.mainUrl + `?rate=${rateId}&userId=${userId}`,rateData)
    // http://localhost:1014/stg/project.new_rate_index/api/rateinfo?rate=4&userId=1
    }

    deleteRateInfo(rateId:number){
      return this.http.delete(this.mainUrl + `?rateId=${rateId}` )

    }
}
