import { Component } from '@angular/core';
import { bikeService } from '../services/bike.service';
import { BikeListing } from '../model/bike.model';
import { ActivatedRoute, Router } from '@angular/router';
import { bikeType } from '../model/type.model';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent {
  public newBike: BikeListing = new BikeListing;
  id!:number;
  selectedFeatures: string[] = [];
  type= new bikeType()
  bikeType: bikeType[] = this.bikeServ.listBikeTypes()
  constructor(private actRoute: ActivatedRoute, private bikeServ: bikeService, private route: Router) { }
  
  updateSelectedFeatures(event: any): void {
    const value = event.target.value;
    if (event.target.checked && !this.selectedFeatures.includes(value)) {
        this.selectedFeatures.push(value);
    } else {
        const index = this.selectedFeatures.indexOf(value);
        if (index !== -1) {
            this.selectedFeatures.splice(index, 1);
        }
    }
  }
  ajouterBike() {
    this.newBike.image="../../assets/Img/"+this.newBike.bikeName+".jpg";
    this.newBike.bikeType=this.bikeServ.viewBikeTypes(this.id);
    this.newBike.features=this.selectedFeatures;
    this.bikeServ.addBikeListing(this.newBike);
    this.route.navigate(['bike']);
  }
  ngOnInit(): void {
  }
}
