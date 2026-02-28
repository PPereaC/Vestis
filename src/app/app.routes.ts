import { Routes } from '@angular/router';
import { LoginPage } from './store-front/pages/login-page/login-page';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginPage
    },
    {
        path: '',
        loadChildren: () => import('./store-front/store-front-routes')
    }

];
