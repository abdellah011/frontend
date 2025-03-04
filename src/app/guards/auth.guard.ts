import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router,private toast:NgToastService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedIn()) {
      return true; // ✅ L'utilisateur est connecté
    } else {
      Swal.fire({
        title: 'Erreur',
        text: 'Tu dois être authentifié !',
        icon: 'error',
        timer: 1000, // ✅
        showConfirmButton: false, // ✅ Supprime le bouton "OK"
        position: "top" // ✅ Position en haut à droite
      });
     
      this.router.navigate(['/login']); // ✅ Redirige vers la page de connexion
      return false;
    }
  }
}
