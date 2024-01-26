import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Admin } from '../model/Admin.model';
import { UserModel } from '../model/user.model';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  Admin : Admin=new Admin();
  AdminX !:Admin;
  UserX: UserModel = new UserModel();
  erreur : boolean = false;
  erreurType: string ='';
  Email:any = this.Admin.AdminEmail;
  constructor(private authService: AuthService, private router: Router,private AdminServ: AdminService) {

  }

  connected() {
    this.AdminServ.findAdmin(String(this.Admin.AdminEmail)).subscribe(
      (response) => {
        this.AdminX = response[0];
        this.UserX.UserEmail = this.AdminX.AdminEmail;
        this.UserX.UserName = this.AdminX.AdminName;
        this.UserX.UserAdress = this.AdminX.AdminType;
        console.log("Response: " + response[0].AdminName);
        this.erreur = false;
          if (this.AdminX.AdminPassword == this.Admin.AdminPassword) {
            this.router.navigate(['content-main']);
            this.authService.User = this.UserX;
            this.authService.isConnected = true;
            this.authService.roleCourant = this.AdminX.AdminType;
            this.authService.userCourant = String(this.AdminX.AdminName);
            this.authService.saveData();
          } else {
            this.erreurType = 'Password';
            this.erreur=true;
            console.log("erreur: " + this.erreur + "erreurtype: " + this.erreurType);
          }
      },
      (error) => {
        this.erreur = true;
        this.erreurType = 'Email';
        console.log("Error: " + this.erreur + "erreurtype: " + this.erreurType + "error : "+ error.message);
      }
    );
  }
  
  reset() {
    this.erreur = false;
  }
}
