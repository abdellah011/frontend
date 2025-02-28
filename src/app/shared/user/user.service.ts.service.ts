import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceTsService {
  private apiUrl = `${environment.apiBaseUrl}/Users`; // ✅ Correct base URL

  constructor(private http: HttpClient) {}

  // ✅ GET all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    console.log('Sending user:', user); // ✅ Log payload before sending
    return this.http.post<User>(this.apiUrl, user);
  }
  
  // ✅ DELETE a user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
}
