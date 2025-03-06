import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { UserStoreService } from 'app/services/userStore/user-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required], 
      password: ['', Validators.required] // ✅ Correction: 'Password' devient 'password'
    });
  }

  // ✅ Récupération sécurisée des contrôles du formulaire
  get formControls() {
    return this.loginForm.controls;
  }

  onlogin() { 
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title: "Connexion réussie ✅",
            text: res.message,
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            position: "top"
          }).then(() => {
            this.auth.storeToken(res.token);
            let tokenPayload = this.auth.decodeToken();
            this.userStore.setFullName(tokenPayload.unique_name);
            this.router.navigate(['/dashboard']); // ✅ Correction chemin
          });
        },

        error: (err) => {
          Swal.fire({
            title: "Erreur ❌",
            text: err?.error.message || "Une erreur s'est produite",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
            position: "top"
          });
        }
      });
    } else {
      this.validateFormFields(this.loginForm); 
      Swal.fire({
        title: "Formulaire invalide ⚠️",
        text: "Veuillez remplir tous les champs obligatoires",
        icon: "warning",
        timer: 1000,
        showConfirmButton: false,
        position: "top"
      });
    }
  }

  private validateFormFields(formGroup: FormGroup) { 
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }
}
