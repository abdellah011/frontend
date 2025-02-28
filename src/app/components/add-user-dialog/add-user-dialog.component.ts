import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'app/shared/user/user.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  user: User = new User(0, '', '', '', '');

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser(): void {
    if (this.user.name.trim() && this.user.email.trim()) {
      console.log('Saving user:', this.user); // ✅ Debug
      this.dialogRef.close(this.user); // Send back to parent
    } else {
      alert('Name and Email are required');
    }
  }
}  