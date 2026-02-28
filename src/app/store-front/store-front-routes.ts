import { Routes } from "@angular/router";
import { StoreFrontLayout } from "./layouts/store-front-layout/store-front-layout";
import { HomePage } from "./pages/home-page/home-page";
import { GenderPage } from "./pages/gender-page/gender-page";
import { ProductPage } from "./pages/product-page/product-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { CartPage } from "./pages/cart-page/cart-page";


export const storeFrontRoutes: Routes = [
    {
        path: '',
        component: StoreFrontLayout,
        children: [
            {
                path: '',
                component: HomePage
            },
            {
                path: 'genero/:genero',
                component: GenderPage
            },
            {
                path: 'producto/:id',
                component: ProductPage
            },
            {
                path: 'carrito',
                component: CartPage
            },
            {
                path: '**',
                component: NotFoundPage
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
    }
];

export default storeFrontRoutes;
