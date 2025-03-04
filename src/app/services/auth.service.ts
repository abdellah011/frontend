  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Router } from '@angular/router';
  import { JwtHelperService } from '@auth0/angular-jwt';
  import Swal from 'sweetalert2';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private authUrl: string = "http://localhost:5071/api/Auth/";
    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient, private router: Router) {}

    login(loginObj: any) {
      return this.http.post<any>(`${this.authUrl}authenticate`, loginObj);
    }

    storeToken(tokenValue: string) {
      if (tokenValue) {
        localStorage.setItem('token', tokenValue);
        console.log("Token enregistré :", tokenValue);
      } else {
        console.warn("⚠️ Aucun token valide reçu !");
      }
    }

    getToken(): string {
      return localStorage.getItem('token') || ''; // ✅ Retourne une chaîne vide si aucun token
    }

    /** ✅ Correction de decodeToken() */
    decodeToken(): any {
      const token = this.getToken();
      if (!token) {
        console.warn("⚠️ Aucun token trouvé !");
        return null;
      }
    
      try {
        const decoded = this.jwtHelper.decodeToken(token);
        console.log("Token décodé :", decoded); // 🔥 Vérification
        return decoded;
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return null;
      }
    }
    

    /** ✅ Correction de isLoggedIn() */
    isLoggedIn(): boolean {
      const token = this.getToken();
      return token && !this.jwtHelper.isTokenExpired(token);
    }

    /** ✅ Correction de getFullNameFromToken() */
    getFullNameFromToken(): string {
      const decodedToken = this.decodeToken();
      return decodedToken ? decodedToken.unique_name || '' : '';
      
    }
    

    signOut() {
      localStorage.clear();
      console.log("Déconnexion en cours...");
      this.router.navigate(['/login']);
    }
  }
