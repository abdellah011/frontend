import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { add_FileComponent } from '../../Documents/add_File/add-File/add_File.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { CategorieComponent } from 'app/Documents/categorie/categorie.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,canActivate:[AuthGuard] },
    { path: 'user',           component: UserComponent,canActivate:[AuthGuard] },
    { path: 'table',          component: TableComponent ,canActivate:[AuthGuard]},
    { path: 'typography',     component: TypographyComponent ,canActivate:[AuthGuard]},
    { path: 'add_File',          component: add_FileComponent ,canActivate:[AuthGuard]},
    { path: 'categorie/:catName',          component: CategorieComponent ,canActivate:[AuthGuard]},
    { path: 'maps',           component: MapsComponent ,canActivate:[AuthGuard]},
    { path: 'notifications',  component: NotificationsComponent ,canActivate:[AuthGuard]},
];
