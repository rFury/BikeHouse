import { Component } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UsersService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user:UserModel= new UserModel();
  pw!:string;
  C_pw!:string;
  passwordConfirmationClass = '';
  constructor(private actRoute: ActivatedRoute, private route: Router , public UserServ:UsersService) {}
    Verif() {
      const b1Button = document.querySelector('#b1') as HTMLButtonElement | null;
      if ((!this.C_pw)&&(!this.pw)) {
        this.passwordConfirmationClass = 'bg-wrong';
        if (b1Button) {
          b1Button.removeAttribute('disabled');
        }
      }
      else
      {
        if ((this.C_pw === this.pw) && (this.C_pw !== "")) {
          this.passwordConfirmationClass = 'bg-right';
          if (b1Button) {
            b1Button.removeAttribute('disabled');
          }
        } else if (this.C_pw !== "" && (this.C_pw !== this.pw)) {
          this.passwordConfirmationClass = 'bg-wrong';
          if (b1Button) {
            b1Button.setAttribute('disabled', 'true');
          }
        } else {
          if (b1Button) {
            b1Button.setAttribute('disabled', 'true');
          }
        }
      }
    }
    CreateUser(){
      this.user.UserBalance = 0;
      this.user.UserPassword=this.C_pw;
      console.log(this.user);
      this.UserServ.AddUser(this.user).subscribe(
        (response) => {
          console.log('Successfully added User:', response);
          this.route.navigate(['connect']);
        },
        (error) => {
          console.error('Error adding User:', error);
        }
      );
    }
    ngOnInit() {
      console.log(this.Verif());
    }
}
