import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDataComponent } from './product-data/product-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: 'product-list', component: ProductListComponent},
    {path: 'product-data', component: ProductDataComponent},
    {path: 'edit-product/:id', component: ProductDataComponent},
    {path: '', redirectTo: '/product-list', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
