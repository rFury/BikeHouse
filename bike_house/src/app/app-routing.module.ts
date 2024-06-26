import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ContentMainComponent } from './content-main/content-main.component';
import { SellComponent } from './sell/sell.component';
import { SearchBikeComponent } from './search-bike/search-bike.component';
import { ConnectComponent } from './connect/connect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { UsersComponent } from './users/users.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AccessGuard } from './guard/access.guard';
import { AdminComponent } from './admin/admin.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { SellAccessoryComponent } from './sell-accessory/sell-accessory.component';
const routes: Routes = [
{ path: '', redirectTo: '/content-main', pathMatch: 'full' },
{path: "content-main", component : ContentMainComponent},
{path:"bike",component : SearchBikeComponent},
{path: "sign-in", component : SignInComponent},
{path: "sell", component : SellComponent,canActivate:[AccessGuard]},
{path:"search-bike",component:SearchBikeComponent},
{path:"connect",component:ConnectComponent},
{path:"Dashboard",component:DashboardComponent},
{path:"account",component:AccountComponent},
{path:"users",component:UsersComponent,canActivate:[AccessGuard]},
{path:"forbidden",component:ForbiddenComponent},
{path:"Admin",component:AdminComponent},
{path:"Accessories",component:AccessoriesComponent},
{path:"sell-accessory",component:SellAccessoryComponent,canActivate:[AccessGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
