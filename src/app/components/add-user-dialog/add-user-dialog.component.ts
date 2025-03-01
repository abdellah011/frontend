import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'app/shared/user/user.model';
import { UserServiceTsService } from 'app/shared/user/user.service.ts.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  user: User = new User(0, '', '', '', '');
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
          alert('Utilisateur ajouté avec succès !');
          this.dialogRef.close(response); // ✅ Ferme la boîte de dialogue avec l'utilisateur ajouté
        },
        (error) => {
          this.errorMessage = error;
          alert(error); // ✅ Afficher une alerte si l'email existe déjà
        }
      );
      
    } else {
      alert('Le nom et l\'email sont obligatoires.');
    }
  }
}
