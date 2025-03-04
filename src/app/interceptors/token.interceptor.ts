import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = this.auth.getToken();

    let authReq = req; // Copie de la requête

    if (myToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${myToken}`
        }
      });
    }

    console.log("✅ Requête interceptée :", authReq);

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          console.error("❌ Erreur HTTP interceptée :", err);

          if (err.status === 401) { // 401 Unauthorized
            console.warn("🔴 Non autorisé ! Redirection vers /login...");
            this.auth.signOut();
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => err);
      })
    );
  }
}
