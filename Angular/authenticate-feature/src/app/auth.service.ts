import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http...';
  constructor(private http: HttpClient) {}
  //signUp
  signUp(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/singup`, body);
  }
  //signIn
  // singIn(email: string, password: string): Observable<any>{

  // }
}
