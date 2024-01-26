import { Injectable } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { UserModel } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'myAppUserDataKey';
  User !:UserModel;
  userCourant!: string;
  roleCourant!: string;
  isConnected!: boolean;

  constructor(private router:Router) {
    this.loadData();
}
    getUserCourant():UserModel 
    {
      return this.User;
    }
    disconnect() {
      this.isConnected = false;
      this.userCourant = '';
      this.roleCourant = '';
      this.User=new UserModel();
      this.saveData();
      this.router.navigate(['/connect']);
    }
    testerAdmin(): boolean {
      return this.roleCourant === 'ADMIN';
    }

    saveData(): void {
      const data = {
        User: this.User,
        userCourant: this.userCourant,
        roleCourant: this.roleCourant,
        isConnected: this.isConnected,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  
    private loadData(): void {
      // Load data from localStorage
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        const data = JSON.parse(storedData);
        this.User = data.User;
        this.userCourant = data.userCourant;
        this.roleCourant = data.roleCourant;
        this.isConnected = data.isConnected;
      }
    }
  
    // Call this method whenever you want to update the data
    updateUserData(users: UserModel): void {
      this.User = users;
      /*this.userCourant = userCourant;
      this.roleCourant = roleCourant;
      this.isConnected = isConnected;*/
      // Save the updated data to localStorage
      this.saveData();
    }
}