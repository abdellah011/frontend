import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

export interface RouteInfo {
    path?: string;
    title: string;
    icon: string;
    class: string;
    onlyAdmin?: boolean;
    children?: RouteInfo[];
    isOpen?: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', onlyAdmin: true },

    {
        title: 'Document',
        icon: 'nc-paper',
        class: '',
        isOpen: false,
        children: [
            { path: '/add_File', title: 'Ajouter un Fichier', icon: 'nc-cloud-upload-94', class: '' },
            { path: '/categorie/:catName', title: 'Catégorie', icon: 'nc-bullet-list-67', class: '' }
        ]
    },

    { path: '/maps', title: 'Maps', icon: 'nc-pin-3', class: '' },
    { path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: '' },
    { path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '' },
    { path: '/table', title: 'Utilisateurs', icon: 'nc-tile-56', class: '', onlyAdmin: true },
    { path: '/typography', title: 'Typography', icon: 'nc-caps-small', class: '' },
];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public menuItems: RouteInfo[] = [];
    public isAdmin: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.isAdmin = this.authService.getUserRole() === 'admin';
        this.menuItems = ROUTES.filter(menuItem => !menuItem.onlyAdmin || this.isAdmin);
    }

    toggleMenu(menuItem: RouteInfo): void {
        menuItem.isOpen = !menuItem.isOpen;
    }
}
