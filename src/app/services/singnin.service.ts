import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  mainUrl = 'http://localhost:1014/stg/project.new_rate_index/api/user';

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

  updateUser(userId: number, userAdminDto: any): Observable<any> {
    return this.http.patch<any>(`${this.mainUrl}/${userId}`, userAdminDto);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.mainUrl}?userId=${userId}`);
  }

  authenticateUser(credentials: { username: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.mainUrl}/authenticate`, credentials, { headers });
  }
}
