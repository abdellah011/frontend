import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  // ✅ Add user with error handling
  addUser(user: User): Observable<User> {
    console.log('Sending user:', user);
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError) // ✅ Gérer les erreurs
    );
  }

  // ✅ DELETE a user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 
 
  // ✅ Update user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // ✅ Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    console.error('Erreur du backend:', error); // ✅ Affiche l'erreur en console pour debug
  
    let errorMessage = "Une erreur s'est produite. Veuillez réessayer.";

    if (error.error) {
      if (error.error.Message) {
        errorMessage = error.error.Message; // ✅ Vérifie si "Message" existe
      } else if (error.error.message) {
        errorMessage = error.error.message; // ✅ Vérifie si "message" existe
      }
    }

    return throwError(errorMessage); // ✅ Renvoie le bon message
  }
}
