import { Component } from '@angular/core';
import { bikeService } from '../services/bike.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nbBikes !: number;
  AVGprice : number;
  nbUsers !: number;
  constructor(private bikeServ : bikeService,private authS: AuthService) {
    this.nbBikes = this.bikeServ.getNbBikes();
    this.AVGprice = this.bikeServ.getAVGpriceBike();
    }
}
