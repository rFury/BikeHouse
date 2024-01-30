import { Component, OnInit , TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { UserModel } from '../model/user.model';
import { UsersService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrdersService } from '../services/orders.service';
import { Orders } from '../model/Order.model';
import { OrderAccessory } from '../model/OrderAccessory.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  modalRef!: BsModalRef;
  Orders : Orders[]= [];
  OrdersA: OrderAccessory[]=[];
  Users : UserModel[]= [];
  constructor(private OrderServ:OrdersService,private actRoute: ActivatedRoute, private route: Router , public AuthServ:AuthService,private UserServ:UsersService,private modalService:BsModalService) {
    this.ListUsers();
  }
  ListUsers(){
    this.UserServ.getUsers().subscribe(
      (response)=>{
        this.Users = response;
      },
      (error)=>{
        console.log(error.message);
      }
    );
  }
  getUserOrders(Orders:String[]){
    if(Orders!=undefined){
      this.OrderServ.getUserOrders(Orders).subscribe(
        (response)=>{
          this.Orders=response;
        },
        (error)=>{
          console.log(error.message);
        }
      );
    }
  }

  getUserOrdersA(Orders:String[]){
    if(Orders!=undefined){
      this.OrderServ.getUserOrdersAccessory(Orders).subscribe(
        (response)=>{
          this.OrdersA=response;
        },
        (error)=>{
          console.log(error.message);
        }
      );
    }
  }

  openModal(template: TemplateRef<any>,Orders:String[]|null,OrdersA:String[]|null) {
    this.modalRef = this.modalService.show(template);
    console.log("Orders : "+Orders);
    if(Orders!=null){
      this.getUserOrders(Orders);
    }
    if(OrdersA!=null){
      this.getUserOrdersA(OrdersA);
    }
  }

  delete(idU:number|undefined){
    if(idU!=undefined){
      let rep = confirm("Are you sure you want to delete this user?");
      if(rep){
        this.UserServ.deleteUser(idU).subscribe(
          (response)=>{
            this.ListUsers();
            console.log(response);
          },
          (error)=>{
            console.log(error.message);
          }
        );
      }
    }
  }

  ngOnInit(): void {
  }
}
