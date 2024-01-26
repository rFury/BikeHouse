import { Injectable } from '@angular/core';
import { BikeListing } from '../model/bike.model';
import { bikeType } from '../model/type.model';
import {Bike} from '../model/MotorBike.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class bikeService {
  private apiUrl = "http://127.0.0.1:8000/Bikes";

  bikeListings!: BikeListing[];
  bikeType!: bikeType[];
  bikeBought!:BikeListing[];

  constructor(private http: HttpClient) {}


  deleteBike(id: number): Observable<any>{
    return this.http.delete(this.apiUrl+"/"+id);
  }


  updateBike(bike: Bike): Observable<Bike> {
    const url = `${this.apiUrl}/${bike.BikeId}`;
    return this.http.put<Bike>(url, bike);
  }

  addBike(bike:Bike):Observable<Bike> {
    return this.http.post<Bike>(this.apiUrl,bike);
  }
  
  getBikes():Observable<Bike[]>{
    return this.http.get<Bike[]>(this.apiUrl);
  }
  SearchBikes(params:{}):Observable<Bike[]>{
    return this.http.get<Bike[]>(this.apiUrl+"/FindBikes",{params});
  }
  getBikeById(id:string):Observable<Bike>{
    return this.http.get<Bike>(this.apiUrl+"/"+parseInt(id));
  }

  getUserBikes(ids: String[]): Observable<Bike[]> {
    const params = {Bikes: ids.map(String)}
    return this.http.get<Bike[]>(this.apiUrl+"/BikesIds", { params });
  }

  getBikeListings() {
    return this.bikeListings;
  }
  getBikeBoughtListings() {
    return this.bikeBought;
  }
  getNbBikes(): number {
    return this.bikeListings.length;
  }

  getAVGpriceBike(): number {
    const totalPrices = this.bikeListings.reduce((acc, bike) => acc + bike.price, 0);
    const averagePrice = totalPrices / this.bikeListings.length;
    return isNaN(averagePrice) ? 0 : +averagePrice.toFixed(3);
  }
 
  getNbBikeTypes() : number{
    return this.bikeListings.length;
  }

}
