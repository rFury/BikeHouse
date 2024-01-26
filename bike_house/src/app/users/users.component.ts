import { Component, OnInit , TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { UserModel } from '../model/user.model';
import { UsersService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrdersService } from '../services/orders.service';
import { Orders } from '../model/Order.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  modalRef!: BsModalRef;
  Orders : Orders[]= [];
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

  openModal(template: TemplateRef<any>,Orders:String[]) {
    this.modalRef = this.modalService.show(template);
    console.log("Orders : "+Orders);
    this.getUserOrders(Orders);
  }

  ngOnInit(): void {
  }
}
