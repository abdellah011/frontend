import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    onlyAdmin?: boolean; // ✅ Ajout d'un flag pour restreindre l'accès aux admins
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon:'nc-bank', class: '' },
    { path: '/add_File', title: 'Ajouter un Fichier', icon: 'file_upload', class: '' },
    { path: '/maps', title: 'Maps', icon:'nc-pin-3', class: '' },
    { path: '/notifications', title: 'Notifications', icon:'nc-bell-55', class: '' },
    { path: '/user', title: 'User Profile', icon:'nc-single-02', class: '' },
    { path: '/table', title: 'Utilisateurs', icon:'nc-tile-56', class: '', onlyAdmin: true }, // ✅ Ajout de onlyAdmin
    { path: '/typography', title: 'Typography', icon:'nc-caps-small', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO', icon:'nc-spaceship', class: 'active-pro' },
];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public isAdmin: boolean = false; // ✅ Déterminer si l'utilisateur est admin

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.isAdmin = this.authService.getUserRole() === 'admin';
        this.menuItems = ROUTES.filter(menuItem => !menuItem.onlyAdmin || this.isAdmin); // ✅ Filtrer le menu
    }
}
