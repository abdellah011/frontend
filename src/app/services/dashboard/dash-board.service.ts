import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserStats {
  date: string;
  totalUsers: number;
  connectedUsers: number;
  disconnectedUsers: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getUserStats(): Observable<UserStats> {
    return this.http.get<UserStats>('http://localhost:5071/api/Dashboard/user-stats');
  }
  getUserStatsHistory(): Observable<UserStats[]> {
    return this.http.get<UserStats[]>('http://localhost:5071/api/Dashboard/user-stats-history');
  }
  getUserRolesStats(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5071/api/Dashboard/user-roles');
  }
  //Cette méthode est clairement corrigée avec la bonne URL :
  getUsersAdminsCount(): Observable<{ totalUsers: number, totalAdmins: number }> {
    return this.http.get<{ totalUsers: number, totalAdmins: number }>(`http://localhost:5071/api/Dashboard/count-users-admins`);
  }
  
  
}
