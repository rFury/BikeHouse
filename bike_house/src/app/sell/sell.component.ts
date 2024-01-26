import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bike } from '../model/MotorBike.model';
import { bikeService } from '../services/bike.service';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent {
  public newBike: Bike = new Bike();
  src : String = '../../assets/Img/';
  constructor(private actRoute: ActivatedRoute, private bikeServ: bikeService, private route: Router) { }
  
  ajouterBike() {
    if(this.newBike!=undefined){
      this.newBike.Picture_File_Name=this.src+this.newBike.Picture_File_Name.substring(12);
      this.newBike.Status="On Sale";
      this.bikeServ.addBike(this.newBike).subscribe(
        (response)=>{
          console.log(response);
          this.route.navigate(['bike']);
        },
        (error)=>{
          console.log(error);
        }
      );
      console.log(this.newBike);
    }

  }
  ngOnInit(): void {
  }
}
