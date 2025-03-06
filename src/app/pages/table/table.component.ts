import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserServiceTsService } from 'app/shared/user/user.service.ts.service';
import { User } from 'app/shared/user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from 'app/components/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'role', 'password', 'actions'];
  dataSource = new MatTableDataSource<User>([]); // ✅ Correction : initialisation correcte

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ✅ Ajout du paginator avec ViewChild

  searchId: string = '';
  isEditing: boolean = false;
  selectedUser: User | null = null;
  users: User[] = [];

  constructor(
    private userServiceTsService: UserServiceTsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        console.log("✅ Paginator bien assigné !");
      } else {
        console.error("❌ Erreur : Paginator non trouvé !");
      }
    });
  }

  // ✅ Charger les utilisateurs depuis l'API
  loadUsers(): void {
    this.userServiceTsService.getUsers().subscribe({
      next: (data: User[]) => {
        console.log("📢 Données récupérées depuis l'API :", data);

        if (!data || data.length === 0) {
          console.warn("⚠️ Aucun utilisateur trouvé !");
        }

        this.users = data;
        this.dataSource.data = data; // ✅ Correction : mise à jour correcte de `dataSource`

        setTimeout(() => {
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        });
      },
      error: (err) => {
        console.error('🚨 Erreur lors de la récupération des utilisateurs:', err);
      }
    });
  }

  // ✅ Filtrer les utilisateurs par ID
  applyFilter(): void {
    this.dataSource.filter = this.searchId.trim().toLowerCase();
  }

  // ✅ Ajouter un utilisateur via un dialogue
  addUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      autoFocus: true,      
      disableClose: false  
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userServiceTsService.addUser(result).subscribe(() => this.loadUsers());
      }
    });
  }

  // ✅ Modifier un utilisateur
  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.isEditing = true;
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userServiceTsService.updateUser(this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          this.cancelEdit();
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
        }
      });
    }
  }

  // ✅ Supprimer un utilisateur
  deleteUser(id: number): void {
    this.userServiceTsService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  // ✅ Annuler la modification
  cancelEdit(): void {
    this.isEditing = false;
    this.selectedUser = null;
  }
}
