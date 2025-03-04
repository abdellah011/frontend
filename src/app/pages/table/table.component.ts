  import { Component, OnInit } from '@angular/core';
  import { UserServiceTsService } from 'app/shared/user/user.service.ts.service';
  import { User } from 'app/shared/user/user.model';
  import { AddUserDialogComponent } from 'app/components/add-user-dialog/add-user-dialog.component';
  import { MatDialog } from '@angular/material/dialog';
import { UserStoreService } from 'app/services/userStore/user-store.service';
import { AuthService } from 'app/services/auth.service';

  @Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
  })
  export class TableComponent implements OnInit {
    users: User[] = [];
    isEditing: boolean = false;
    selectedUser: User | null = null;

    constructor(
      private userServiceTsService: UserServiceTsService,
      public dialog: MatDialog,
      private userStore:UserStoreService,
      private auth:AuthService
    ) {}

    ngOnInit(): void {
      this.loadUsers();
    }
    

    // Load all users from API
    loadUsers(): void {
      this.userServiceTsService.getUsers().subscribe({
        next: (data: User[]) => {
          this.users = data;
          console.log("Utilisateurs récupérés :", data);

        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
    }

    // ✅ Open Add User Dialog
    addUser(): void {
      const dialogRef = this.dialog.open(AddUserDialogComponent, {
        width: '400px',
        autoFocus: true,      // ✅ Automatically focus dialog content
        disableClose: false   // Allows closing on clicking outside (optional)
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.userServiceTsService.addUser(result).subscribe(() => this.loadUsers());
        }
      });
    }
    
    
    // ✅ Edit User
    editUser(user: User): void {
      this.selectedUser = { ...user };
      this.isEditing = true;
    }
    updateUser(): void {
      if (this.selectedUser) {
        this.userServiceTsService.updateUser(this.selectedUser).subscribe({
          next: () => {
            this.loadUsers(); // Refresh table
            this.cancelEdit(); // Exit edit mode

          },
          error: (err) => {
            console.error('Error updating user:', err);
          }
        });
      }
    }
    

    // ✅ Delete User
    deleteUser(id: number): void {
      this.userServiceTsService.deleteUser(id).subscribe(() => this.loadUsers());
    }

    // ✅ Cancel Edit
    cancelEdit(): void {
      this.isEditing = false;
      this.selectedUser = null;
    }
    
  }