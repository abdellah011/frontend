import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private authUrl :string ="http://localhost:5071/api/Auth/"
  constructor(private http: HttpClient) { }
  login(loginObj :any){

    return this.http.post<any>(`${this.authUrl}authenticate`, loginObj);

  }
}
