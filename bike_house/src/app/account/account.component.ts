import { Component,OnInit ,TemplateRef} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { bikeService } from '../services/bike.service';
import { BikeListing } from '../model/bike.model';
import { UserModel } from '../model/user.model';
import { Orders } from '../model/Order.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrdersService } from '../services/orders.service';
import { Bike } from '../model/MotorBike.model';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  SearchedBike!:Bike;
  modalRef!: BsModalRef;
  User: UserModel = new UserModel();
  Orders: Orders[] = [];
  OrderedBikes : Bike[] = [];

  constructor(private modalService: BsModalService,public AuthServ: AuthService, public bikeServ: bikeService,private OrderServ : OrdersService) {
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
  getBikeById(id:number):Bike[]{
    return this.OrderedBikes.filter(o=>o.BikeId==id);
  }
  Bikes() {
    if (this.Orders && this.Orders.length > 0) {
      const list: number[] = this.Orders.map(element => element.Bike);
      console.log(list);
    } else {
      console.log('Orders is empty or undefined');
    }
  }
  
  ngOnInit(){
    this.getUserOrders();
  }
  openModal(template: TemplateRef<any>,id:string) {
    this.modalRef = this.modalService.show(template);
    console.log("id : "+id);
    this.SearchedBike=this.getBikeById(parseInt(id))[0];
  }
}
