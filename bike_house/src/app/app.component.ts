import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bike_House';
  constructor(public authServ : AuthService) { 

  }
  disconnect() {
    this.authServ.disconnect();
  };
  ngOnInit() {
    
  }
}
