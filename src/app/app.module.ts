import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import de ReactiveFormsModule
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { LucideAngularModule } from 'lucide-angular';
import { FileText, ChevronDown } from 'lucide-angular';




// ✅ Angular Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NgToastModule } from 'ng-angular-popup';

// ✅ Custom Modules
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './shared/navbar/navbar.module';

// ✅ Components
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { tokenInterceptor } from "./interceptors/token.interceptor";
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddUserDialogComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    LucideAngularModule.pick({ FileText, ChevronDown }),
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    FormsModule,
    HttpClientModule,
    NgToastModule,

    // Angular Material
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,

    // Custom Modules
    SidebarModule,
    NavbarModule,
  ],
  providers: [
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: 'http://localhost:5280/graphql' }),
        cache: new InMemoryCache(),
      };
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: tokenInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
