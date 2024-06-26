import { Component ,TemplateRef , OnInit} from '@angular/core';
import { bikeService } from '../services/bike.service';
import { Bike } from '../model/MotorBike.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserModel } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-bike',
  templateUrl: './search-bike.component.html',
  styleUrls: ['./search-bike.component.css']
})
export class SearchBikeComponent {
  readonly:boolean = true;
  erreur:boolean = false;
  User:UserModel = this.AuthServ.getUserCourant();
  SearchedBike !: Bike;
  modalRef!: BsModalRef;
  Bikes:Bike[] = [];
  X:Bike=new Bike();
  constructor( private route: Router ,private bikeServ: bikeService,private modalService: BsModalService,public AuthServ: AuthService,private UserServ: UsersService) {
    this.ListBikes();
  }

  delete(id: string){
    let rep = confirm("Are you sure you want to delete this Bike?");
    if (rep) {
      this.bikeServ.deleteBike(parseInt(id)).subscribe((data) => {
        console.log(data);
        this.ListBikes();
      }, (error) => {
        console.log(error.message);
      });
    }
  }


  updateBike(){
    let rep = confirm("Are you sure you want to update this Bike?");
    if(rep) {
      this.bikeServ.updateBike(this.SearchedBike).subscribe(
        (reponse)=>{
          console.log(reponse);
          this.ListBikes();
          this.modalRef.hide();
        },
        (error)=>{
          console.log(error.message);
        }
      );
    }
  }


  buyBike(id: string,template: TemplateRef<any>) {
    this.bikeServ.getBikeById(id).subscribe(
      (response) => {
        this.SearchedBike = response;
          if (this.SearchedBike && this.SearchedBike.Price != null) {  
          if (this.User.UserBalance != null && Number(this.SearchedBike.Price) > Number(this.User.UserBalance)) {
            this.openErreur(template);
            this.erreur=true;
          } else if (this.User.UserBalance != null && Number(this.SearchedBike.Price) <= Number(this.User.UserBalance)) {
            let responseX=confirm("Do you really want to buy this Bike?");
              if (responseX){
                this.UserServ.OrderBike(this.AuthServ.User.UserId, id)?.subscribe(
                  (response) => {
                    this.UserServ.getUserId(this.AuthServ.User.UserId).subscribe(
                      (response) => {
                        this.AuthServ.User=response;
                        this.AuthServ.saveData();
                        console.log("saving after order done");
                        this.route.navigate(['account']);
                      },
                      (error)=>{
                        console.log(error.message);
                      }
                    )
                  },
                  (error) => {
                    console.log(error.message);
                  }
                );
              }
          }
        } else {
          console.error('SearchedBike is undefined or does not contain Price property.');
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  openErreur(template: TemplateRef<any>) {
    this.modalRef=this.modalService.show(template);
    this.initiateDivRemoval();
  }
  openModal(template: TemplateRef<any>,id:string) {
    this.modalRef = this.modalService.show(template);
    console.log("id : "+id);
    this.bikeServ.getBikeById(id).subscribe(
      (response)=>{
        this.SearchedBike=response;
        console.log(this.SearchedBike.Name);
      },
      (error)=>{
        console.log(error.message);
      }
    );
  }
  ListBikes(){
    this.bikeServ.getBikes().subscribe(
      (Response)=> {
        this.Bikes = Response;
        this.Bikes.sort((a, b) => Number(b.Price) - Number(a.Price));
        /*console.log(JSON.stringify(this.Bikes))*/;
      },
      (error)=> {
        console.log("error = "+error.message);
      }
    )
  }
  SearchBike(){
    const params = {BikeName:this.X.Name,
      BikeYear:this.X.Year,
      BikeBrand:this.X.Brand,
      BikeType:this.X.Type,
      BikePrice:this.X.Price,
      BikeStatus:this.X.Status
    };
      this.bikeServ.SearchBikes(params).subscribe(
        (response)=> {
          this.Bikes=response
        },
        (error)=> {
          this.Bikes = [];
          console.log("error = "+error.message);
        }
      );
    console.log("Searched " + params.BikeBrand);
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
  ngOnInit() {
    this.initiateDivRemoval();
    this.readonlyData();
  };
}
