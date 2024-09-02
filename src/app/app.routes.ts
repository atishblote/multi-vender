import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BooksComponent } from './pages/books/books.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path:'sign-up', component: RegisterComponent},
    { path:"bk",'title':"Dashboard | Satta Matka" , loadChildren: () => import('./bk/bk.module').then( (m) => m.BkModule )},
    
    {path:'***', component: LoginComponent}
];
