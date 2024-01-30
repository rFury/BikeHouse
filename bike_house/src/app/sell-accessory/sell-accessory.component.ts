import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accessory } from '../model/Accessory.model';
import { AccessoryService } from '../services/accessory.service';
@Component({
  selector: 'app-sell-accessory',
  templateUrl: './sell-accessory.component.html',
  styleUrls: ['./sell-accessory.component.css']
})
export class SellAccessoryComponent {
  public newAccessory: Accessory = new Accessory();
  src : String = '../../assets/Img/';
  constructor(private actRoute: ActivatedRoute, private AccessoryServ: AccessoryService, private route: Router) { }
  
  ajouterAccessory() {
    if(this.Verfier()){
      if(this.newAccessory!=undefined){
        this.newAccessory.Picture_File_Name=this.src+this.newAccessory.Picture_File_Name.substring(12);
        this.newAccessory.Status="On Sale";
        this.AccessoryServ.addAccessory(this.newAccessory).subscribe(
          (response)=>{
            console.log(response);
            this.route.navigate(['Accessories']);
          },
          (error)=>{
            console.log(error);
          }
        );
        console.log(this.newAccessory);
      }
    }
  }

  Verfier() {
    if (!this.newAccessory.Name || !this.newAccessory.Picture_File_Name || !this.newAccessory.Description || 
        !this.newAccessory.Price || !this.newAccessory.Type || !this.newAccessory.Year || !this.newAccessory.NameOfProduct  || !this.newAccessory.Brand) {
      alert('Please fill in all fields.');
      return false;
    }
    if (!this.newAccessory.Quantity ||this.newAccessory.Quantity==0){
      alert('Quantity must be greater than zero.');
      return false;
    }
    return true;
  }

  ngOnInit(): void {
  }
}
