import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { BooksComponent } from '../pages/books/books.component';
import { OrderComponent } from '../pages/order/order.component';
import { AllUsersComponent } from '../pages/all-users/all-users.component';
import { HomeComponent } from '../pages/home/home.component';
import { CheckoutComponent } from '../pages/checkout/checkout.component';
import { authGuard } from '../auth.guard';
import { adminGuard } from '../shared/admin.guard';
import { readGuard } from '../shared/read.guard';
import { writeGuard } from '../shared/write.guard';
import { updateGuard } from '../shared/update.guard';
import { PermissionUserComponent } from '../pages/permission-user/permission-user.component';
import { ProductAddComponent } from '../pages/product-add/product-add.component';


const routes: Routes = [
    { path: ""  , canActivateChild:[adminGuard ,authGuard],  component : DashboardComponent , children: [
            { path: "" , component : HomeComponent  },
            { path: "book" , canActivate:[readGuard], component : BooksComponent  },
            { path: "book/add" , canActivate:[writeGuard], component : ProductAddComponent  },
            { path: "order" , canActivate:[writeGuard], component : OrderComponent  },
            { path: "users" , canActivate:[updateGuard], component : AllUsersComponent  },
            { path: "checkout" , component : CheckoutComponent  },
            { path: "permission/:id" ,canActivate:[updateGuard], component : PermissionUserComponent  },
            
        ] },
//   { path: ""  , canActivateChild:[roleGuard, isLoginGuard],  component : DashAdminComponent , children: [
//     { path: "home" , component : HomeComponent  },
//     { path: "regular-bazaar"  ,children:[
//       {path: "",  component: RegularBazaarComponent},
//       {path: "create-new/:id", canActivate:[writeGuard], component: CreateNewComponent},
//       {path: "update-one/:id", canActivate:[updateGuard], component: UpdateOneComponent}
//     ]  },
//     { path: "starline-bazaar" , children:[
//       {path: "",  component:  StarlineBazaarComponent},
//       {path: "update-one/:id",canActivate:[updateGuard],  component: UpdateOneComponent},
//       {path: "all-data",canActivate:[writeGuard],  component: StarlineJodiDataComponent},
//       {path: "jodi-data/:id",canActivate:[writeGuard],  component: JodiDataComponent}
//     ] },
//     { path: "king-bazaar" , children:[
//       {path: "" , component: KingBazaarComponent},
//       {path: "update-one/:id" ,canActivate:[updateGuard], component: UpdateOneComponent},
//       {path: "all-data" ,canActivate:[updateGuard], component: KingAllJodiDataComponent},
//       {path: "jodi-data/:id",canActivate:[writeGuard],  component: KingJodiDataComponent}
//     ]  },
//     { path: "users"  , children: [
//       {path: "", component: UsersComponent},
//       {path: "reset/:id",canActivate:[writeGuard],  component: ResetPasswordComponent},
//       {path: "update-one/:id",canActivate:[writeGuard],  component: UpdateOneComponent}
//     ] },
//     { path: "profile" , children:[
//       {path: "", component: ProfileComponent},
//       {path: "reset/:id",canActivate:[roleGuard],  component: ResetPasswordComponent},
//       {path: "update-one/:id",canActivate:[updateGuard],  component: UpdateOneComponent}
//     ]  },
//     {path: "all-jodi-panel" ,canActivate:[writeGuard],component: JodiPanelComponent},
//     {path: "" , redirectTo: 'home' , pathMatch: 'full'},

//   ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BkRoutingModule { }
