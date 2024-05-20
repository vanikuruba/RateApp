import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../user/signup/usermodel.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mainUrl = 'http://localhost:1014/stg/project.new_rate_index/api/user';
  baseUrl = 'http://localhost:1014/stg/project.new_rate_index/api/user/allroles'

  constructor(private http: HttpClient) { }

  createUser(userDto: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.mainUrl}/Register`, userDto, { headers });
  }

  createUserWithFile(file: File, user: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('user', user);
    return this.http.post<any>(`${this.mainUrl}/create`, formData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.mainUrl);
  }

  
  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateUser(userId: number, userAdminDto: any): Observable<any> {
    return this.http.patch<any>(`${this.mainUrl}/${userId}`, userAdminDto);
  }

  updateUserRole(userId: number, roleId: number): Observable<any> {
    const url = `${this.mainUrl}/user/${userId}/role/${roleId}`;
    return this.http.patch<any>(url, {});
  }



  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.mainUrl}?userId=${userId}`);
  }

  loginUser(userLogin: UserLogin): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.mainUrl}/login`, userLogin, { headers });
  }
  logOutUser(userId:number,userData:any){
    // http://localhost:1014/stg/project.new_rate_index/api/user/logout?userId=1
    return this.http.put(this.mainUrl + `/logout?userId=${userId}`, userData)
  }
}
