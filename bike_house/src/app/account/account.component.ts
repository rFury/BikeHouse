import { Component,OnInit ,TemplateRef} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { bikeService } from '../services/bike.service';
import { UserModel } from '../model/user.model';
import { Orders } from '../model/Order.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrdersService } from '../services/orders.service';
import { Bike } from '../model/MotorBike.model';
import {Accessory} from '../model/Accessory.model';
import { OrderAccessory } from '../model/OrderAccessory.model';
import {AccessoryService} from '../services/accessory.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  SearchedAccessory!:Accessory;
  SearchedBike!:Bike;
  modalRef!: BsModalRef;
  User: UserModel = new UserModel();
  Orders: Orders[] = [];
  OrderedBikes : Bike[] = [];
  OrdersAccessory: OrderAccessory[]=[];
  OrderedAccessories: Accessory[] = [];

  constructor(private AccessoryServ:AccessoryService,private modalService: BsModalService,public AuthServ: AuthService, public bikeServ: bikeService,private OrderServ : OrdersService) {
    this.User = this.AuthServ.getUserCourant();

  }
  getUserOrders(){
    if(this.User.ordered_bikes!=undefined){
      this.OrderServ.getUserOrders(this.User.ordered_bikes).subscribe(
        (response)=>{
          this.Orders=response;
          console.log(this.Orders);
          const list: String[] = this.Orders.map(element => String(element.Bike));
          console.log(list);
          this.bikeServ.getUserBikes(list).subscribe(
            (response)=>{
              this.OrderedBikes=response;
            },
            (error)=>{
              console.log(error.message);
            }
          );
        },
        (error)=>{
          console.log(error.message);
        }
      );
    }
  }

  getUsersAccessories() {
    if(this.User.ordered_accessories!=undefined){
      this.OrderServ.getUserOrdersAccessory(this.User.ordered_accessories).subscribe(
        (response)=>{
          this.OrdersAccessory=response
          console.log(this.OrdersAccessory+"   accessoryorders");
          const list: String[] = this.OrdersAccessory.map(element => String(element.Accessory));
          this.AccessoryServ.getUserAccessories(list).subscribe(
            (response)=>{
              this.OrderedAccessories=response;
              console.log(this.OrderedAccessories+" accessories");
            },
            (error)=>{
              console.log(error.message);
            }
          );
        },
        (error)=>{
          console.log(error.message);
        }
      );
    }
  }

  getAccessoryById(id:number):Accessory[]{
    return this.OrderedAccessories.filter(o=>o.AccessoryId==id);
  }

  getBikeById(id:number):Bike[]{
    return this.OrderedBikes.filter(o=>o.BikeId==id);
  }

  
  ngOnInit(){
    this.getUserOrders();
    this.getUsersAccessories();
  }
  openModalOrder(template:TemplateRef<any>,id:number,Quantity:number){
    this.modalRef = this.modalService.show(template)
    this.SearchedAccessory=this.getAccessoryById(id)[0];
    this.SearchedAccessory.Quantity=Quantity;
    this.SearchedAccessory.Price=Number(Quantity)*Number(this.SearchedAccessory.Price);
  }
  openModal(template: TemplateRef<any>,id:string) {
    this.modalRef = this.modalService.show(template);
    console.log("id : "+id);
    this.SearchedBike=this.getBikeById(parseInt(id))[0];
  }
}
