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
export class UpdateBikeComponent implements OnInit {
  id!:number;
  newBike = new BikeListing;
  selectedFeatures: string[];
  newFeatures:string[] =[];
  bikeType: bikeType[] =[];
  constructor(private actRoute: ActivatedRoute, private bikeServ: bikeService, private route: Router) {
    this.selectedFeatures= this.bikeServ.getBikeFeatures(this.actRoute.snapshot.params['name']);
     this.bikeType= this.bikeServ.listBikeTypes()
    console.log(this.selectedFeatures);
   }
  updateSelectedFeatures(event: any): void {
    const value = event.target.value;
    if (event.target.checked && !this.newFeatures.includes(value)) {
        this.newFeatures.push(value);
    } else {
        const index = this.newFeatures.indexOf(value);
        if (index !== -1) {
            this.newFeatures.splice(index, 1);
        }
    }
  }
  modifBike() {
    this.newBike.bikeType=this.bikeServ.viewBikeTypes(this.id);
    this.newBike.features=this.newFeatures;
    this.bikeServ.editBike(this.newBike);
    this.route.navigate(['bike']);
  }

  ngOnInit(): void {
    this.newBike = this.bikeServ.findBike(this.actRoute.snapshot.params['name']);
  }
}
