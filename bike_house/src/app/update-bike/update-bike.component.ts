import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bikeService } from '../services/bike.service';
import { BikeListing } from '../model/bike.model';
import { bikeType } from '../model/type.model';

@Component({
  selector: 'app-update-bike',
  templateUrl: './update-bike.component.html',
  styleUrls: ['./update-bike.component.css']
})
export class UpdateBikeComponent {
  id!:number;
  newBike = new BikeListing;
  bikeType: bikeType[] =[];
  constructor(private actRoute: ActivatedRoute, private bikeServ: bikeService, private route: Router) {
   }

}
