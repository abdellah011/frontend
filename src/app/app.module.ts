import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import de ReactiveFormsModule



// ✅ Angular Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

// ✅ Custom Modules
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

// ✅ Components
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { SearchPipe } from './search.pipe';
import { LoginComponent } from './components/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddUserDialogComponent,
    SearchPipe,
    LoginComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    FormsModule,
    
    ReactiveFormsModule,
    HttpClientModule,

    // ✅ Angular Material Modules
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,

    // ✅ Custom Modules
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ Add this if needed
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
