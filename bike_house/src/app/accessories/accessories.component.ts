import { Component,TemplateRef,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessoryService } from '../services/accessory.service';
import { Accessory } from '../model/Accessory.model';
import { AuthService } from '../services/auth.service';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { UserModel } from '../model/user.model';
import { UsersService } from '../services/user.service';
@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent {
  Quantity: Number =1;
  order:boolean = false;
  Price: Number =0;
  readonly:boolean = true;
  erreur:boolean = false;
  User:UserModel = this.AuthServ.getUserCourant();
  SearchedAccessory !: Accessory;
  modalRef!: BsModalRef;
  Accessories:Accessory[] = [];
  X:Accessory=new Accessory();
  constructor( private route: Router ,private AccessorySev:AccessoryService,private modalService: BsModalService,public AuthServ: AuthService,private UserServ: UsersService) {
    this.listAccessories();
  }
  listAccessories() {
    this.AccessorySev.getAccessories().subscribe(
      (response)=>{
        this.Accessories = response;
        this.Accessories.sort((a, b) => Number(b.Price) - Number(a.Price));

      },
      (error)=>{
        console.log(error.message);
      }
    );
  }
  openErreur(template: TemplateRef<any>) {
    this.modalRef=this.modalService.show(template);
    this.initiateDivRemoval();
  }
  changePrice(){
    this.Price=Number(this.SearchedAccessory.Price)*Number(this.Quantity)
    this.Price.toFixed(3);
    if(Number(this.Price)>Number(this.AuthServ.User.UserBalance)){
      this.erreur = true;
      this.order = true;
    }
    else{
      this.erreur = false;
      this.order = false;
    }
  
  }
  openOrder(template: TemplateRef<any>,id:string) {
    this.modalRef = this.modalService.show(template);
    console.log("id : "+id);
    this.AccessorySev.getAccessoryById(id).subscribe(
      (response)=>{
        this.SearchedAccessory=response;
        this.Price = this.SearchedAccessory.Price;
        this.Quantity=1;
        this.erreur = false;
        this.order = false;
        if(this.AuthServ.User.UserBalance!=undefined){
          if(Number(this.Price)>Number(this.AuthServ.User.UserBalance)){
            this.erreur = true;
            this.order = true;
          }
        }
      },
      (error)=>{
        console.log(error.message);
      }
    );
  }

  buyAccessory(){
    this.UserServ.OrderAccessory(this.AuthServ.User.UserId,String(this.SearchedAccessory.AccessoryId),this.Quantity)?.subscribe(
      (response) =>{
        console.log(response);
        this.UserServ.getUserId(this.AuthServ.User.UserId).subscribe(
          (response) => {
            this.AuthServ.User=response;
            this.AuthServ.saveData();
            console.log("saving after order done");
            this.modalRef.hide();
            this.route.navigate(['account']);
          },
          (error)=>{
            console.log(error.message);
          });
      },
      (error)=>{
        console.log(error.message);
      }
    )
  }

  openModal(template: TemplateRef<any>,id:string) {
    this.modalRef = this.modalService.show(template);
    console.log("id : "+id);
    this.AccessorySev.getAccessoryById(id).subscribe(
      (response)=>{
        this.SearchedAccessory=response;
      },
      (error)=>{
        console.log(error.message);
      }
    );
  }
  removeDivAfterDelay() {
    setTimeout(() => {
      this.erreur = false;
    }, 4000);
  }
  initiateDivRemoval() {
    this.removeDivAfterDelay();
  }
  readonlyData(){
    if(this.AuthServ.roleCourant=='ADMIN'){
      this.readonly=false;
    }
  }


  deleteAccessory(id:string){
    let rep = confirm('Are you sure you want to delete this accessory?');
    if(rep){
      this.AccessorySev.deleteAccessory(Number(id)).subscribe(
        (response)=>{
          this.listAccessories();
          console.log(response);
        },
        (error)=>{
          console.log(error.message);
        }
      );
    }
  }

  updateAccessory(){
  if(Number(this.SearchedAccessory.Quantity)>0 && this.SearchedAccessory.Status=="Out Of Stock"){
    this.SearchedAccessory.Status="On Sale";
  }
  if(Number(this.SearchedAccessory.Quantity)==0 && this.SearchedAccessory.Status=="On Sale"){
    this.SearchedAccessory.Status="Out Of Stock";
  }
    this.AccessorySev.updateAccessory(this.SearchedAccessory).subscribe(
      (response)=>{
        console.log(response);
        this.listAccessories();
        this.modalRef.hide();
      },
      (error)=>{
        console.log(error.message);
      }
    );
  }


  SearchAccessory(){
    const params = {AccessoryName:this.X.Name,
      AccessoryNameOfProduct:this.X.Name,
      AccessoryYear:this.X.Year,
      AccessoryBrand:this.X.Brand,
      AccessoryType:this.X.Type,
      AccessoryPrice:this.X.Price,
      AccessoryStatus:this.X.Status
    };
      this.AccessorySev.SearchAccessories(params).subscribe(
        (response)=> {
          this.Accessories=response
        },
        (error)=> {
          this.Accessories = [];
          console.log("error = "+error.message);
        }
      );
    console.log("Searched " + params.AccessoryBrand);
  }


  ngOnInit() {
    this.initiateDivRemoval();
    this.readonlyData();
  };

}
