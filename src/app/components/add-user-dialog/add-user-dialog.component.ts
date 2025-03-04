import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'app/shared/user/user.model';
import { UserServiceTsService } from 'app/shared/user/user.service.ts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  user: User = new User(0, '', '', '', '','');
  errorMessage: string = ''; // ✅ Stocker le message d'erreur

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserServiceTsService // ✅ Injecter le service
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser(): void {
    if (this.user.name.trim() && this.user.email.trim()) {
      console.log('Saving user:', this.user);
      
      this.userService.addUser(this.user).subscribe(
        (response) => {
          Swal.fire({
            title: "Utilisateur ajouté ✅",
            text: "L'utilisateur a été ajouté avec succès !",
            icon: "success",
            timer: 1000, // ✅ Le popup disparaît après 3 secondes
        showConfirmButton: false, // ✅ Supprime le bouton "OK"
        position: "top" // ✅ Position en haut à droite
          }).then(() => {
            this.dialogRef.close(response); // ✅ Fermer la boîte de dialogue après confirmation
          });
        },
        (error) => {
          this.errorMessage = error;

          Swal.fire({
            title: "Erreur ❌",
            text: "L'email existe déjà ou une autre erreur est survenue.",
            icon: "error",
            timer: 1000, // ✅ Le popup disparaît après 3 secondes
            showConfirmButton: false, // ✅ Supprime le bouton "OK"
            position: "top" // ✅ Position en haut à droite
          });
        }
      );
      
    } else {
      Swal.fire({
        title: "Champs obligatoires ⚠️",
        text: "Le nom et l'email sont obligatoires.",
        icon: "warning",
        timer: 1000, // ✅ Le popup disparaît après 3 secondes
        showConfirmButton: false, // ✅ Supprime le bouton "OK"
        position: "top" // ✅ Position en haut à droite
      });
    }
  }
}
