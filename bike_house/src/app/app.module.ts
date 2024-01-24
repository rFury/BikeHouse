import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentMainComponent } from './content-main/content-main.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { SellComponent } from './sell/sell.component';
import { UpdateBikeComponent } from './update-bike/update-bike.component';
import { ParamMap } from '@angular/router';
import { SearchBikeComponent } from './search-bike/search-bike.component';
import { ConnectComponent } from './connect/connect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    ContentMainComponent,
    SignInComponent,
    AccountComponent,
    SellComponent,
    UpdateBikeComponent,
    SearchBikeComponent,
    ConnectComponent,
    DashboardComponent,
    UsersComponent,
    ForbiddenComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
