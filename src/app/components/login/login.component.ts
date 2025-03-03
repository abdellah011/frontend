import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private auth:AuthService,
     private router: Router,
     private toast: NgToastService
    
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
    name:['',[Validators.required]],  // ✅ Ajout de Validators.Nom
      Password: ['', [Validators.required, ]] // ✅ Ajout de minLength(6)
    });
  }

  onlogin() { 
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({

        next:(res)=>{
          alert(res.message);
          this.router.navigate(['../../pages/dashboard']);

        },
        error:(err)=>{
          alert(err?.error.message)
        }
        
      })
    } else {
      console.log('Formulaire non valide ');
      this.validateFormFields(this.loginForm); 
      alert ("Le Formulaire n'est pas valide")
    }
  }

  private validateFormFields(formGroup: FormGroup) { 
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }
}
