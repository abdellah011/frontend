import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'app/services/auth.service';
import { UserStoreService } from 'app/services/userStore/user-store.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public fullName: string = "";
    public isCollapsed = true;
    public role :string="";

    @ViewChild("navbar-cmp", { static: false }) button;

    constructor(
        location: Location,
        private renderer: Renderer2,
        private userStore: UserStoreService,
        private element: ElementRef,
        private router: Router,
        private auth: AuthService
    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        let navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        this.router.events.subscribe(() => {
            this.sidebarClose();
        });

       // ✅ Écoute les mises à jour du nom depuis `UserStoreService`
    this.userStore.getFullName().subscribe(val => {
      if (val) {
          this.fullName = val;
      } else {
          let fullNameFromToken = this.auth.getFullNameFromToken();
          this.fullName = val || fullNameFromToken

      }


  });
    }

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    sidebarOpen() {
        if (!this.toggleButton) return;
        
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
        
        setTimeout(() => {
            toggleButton.classList.add('toggled');
        }, 500);

        html.classList.add('nav-open');
        if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
        }
        this.sidebarVisible = true;
    }

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
        
        if (window.innerWidth < 991) {
            setTimeout(() => {
                mainPanel.style.position = '';
            }, 500);
        }

        if (this.toggleButton) {
            this.toggleButton.classList.remove('toggled');
        }
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    }

    // ✅ Ajout d'un popup SweetAlert2 pour confirmer la déconnexion
    logOut() {
        Swal.fire({
            title: "Déconnexion",
            text: "Êtes-vous sûr de vouloir vous déconnecter ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Oui, me déconnecter",
            cancelButtonText: "Annuler",
            
        }).then((result) => {
            if (result.isConfirmed) {
                this.auth.signOut();
                this.router.navigate(['/login']);
            }
        });
    }
}
