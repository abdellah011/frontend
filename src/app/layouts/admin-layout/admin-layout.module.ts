import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';


// ✅ Modules Angular Material nécessaires pour le tableau et la pagination
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { add_FileComponent} from '../../Documents/add_File/add-File/add_File.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategorieComponent } from 'app/Documents/categorie/categorie.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    NgxChartsModule,


    // ✅ Import des modules Angular Material nécessaires
    MatTableModule,        // Table Angular Material
    MatPaginatorModule,    // Pagination
    MatFormFieldModule,    // Champs de formulaire
    MatInputModule,        // Inputs Material
    MatButtonModule        // Boutons Material
  ],
  declarations: [
    
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    MapsComponent,
    NotificationsComponent,
    add_FileComponent,
    CategorieComponent
  ]
})

export class AdminLayoutModule {}
