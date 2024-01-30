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
    if(this.Verfier()){
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
  }

  Verfier() {
    if (!this.newBike.Name || !this.newBike.Picture_File_Name || !this.newBike.Description || 
        !this.newBike.Price || !this.newBike.Type || !this.newBike.Year || isNaN(this.newBike.Year) || !this.newBike.Brand) {
      alert('Please fill in all fields.');
      return false;
    }
    console.log('Form submitted successfully:', this.newBike);
    return true;
  }

  ngOnInit(): void {
  }
}
