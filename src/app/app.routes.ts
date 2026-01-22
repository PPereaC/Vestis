import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { CatalogComponent } from './features/catalog/catalog'; 

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' } // Cualquier ruta desconocida va al Home
];