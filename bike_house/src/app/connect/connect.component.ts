import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../model/user.model';
import { UsersService } from '../services/user.service';
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent {
  User : UserModel=new UserModel();
  UserX!: UserModel;
  erreur : boolean = false;
  erreurType: string ='';
  Email:any = this.User.UserEmail;
  constructor(private authService: AuthService, private router: Router,private UserServ: UsersService) {

  }
  connected() {
    this.UserServ.findUser(String(this.User.UserEmail)).subscribe(
      (response) => {
        this.UserX = response[0];
        console.log("Response: " + response[0].UserName);
        this.erreur = false;
          if (this.UserX.UserPassword == this.User.UserPassword) {
            this.router.navigate(['content-main']);
            this.authService.User = this.UserX;
            this.authService.isConnected = true;
            this.authService.roleCourant = "AGENT";
            this.authService.userCourant = String(this.UserX.UserName);
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
