import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}
  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
