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
  erreur : boolean = false;
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

    verifData(){
      if(!this.user.UserAdress || !this.user.UserNumber ||!this.user.UserEmail || !this.user.UserName )
      {
        alert('Please fill all fields ! ')
        return false;
      }
      if(Number(this.user.UserNumber)<9999999){
        alert('Phone number must be greater than 8 digits')
        return false;
      }
      return true;
    }


    CreateUser(){
      if(this.verifData()){
        this.user.UserBalance = 100000;
        this.user.UserPassword=this.C_pw;
        console.log(this.user);
        if(this.user.UserEmail){
        this.UserServ.findUser(this.user.UserEmail).subscribe(
          (response)=>{
            console.log(response,"ALREADY IN USE EMAIL");
            this.erreur = true;
          },
          (error)=>{
            this.UserServ.AddUser(this.user).subscribe(
              (response) => {
                console.log('Successfully added User:', response);
                this.route.navigate(['connect']);
              },
              (error) => {
                console.error('Error adding User:', error.getMessage());
              }
            );
          }
        )
        
        }
      }
    }
    ngOnInit() {
      console.log(this.Verif());
    }
}
