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

  bikeListings: BikeListing[];
  bikeType: bikeType[];
  bikeBought:BikeListing[];

  constructor(private http: HttpClient) {
    this.bikeListings = [
        {
          bikeName: "Kx450",
          description: "A high-quality mountain bike with advanced features.",
          price: 499.99,
          contactInfo: "Contact: John Doe, john@example.com",
          condition: "Used",
          features: ["Full Suspension", "Disc Brakes"],
          bikeType: {id:2,name:'Dirt Bike'},
          frameSize: 18,
          year: 2020,
          location: "New York",
          image: "../../assets/Img/dBike.jpg",
        },
        {
          bikeName: "S1000RR",
          description: "A high-performance sportbike by BMW.",
          price: 20000,
          contactInfo: "Contact: S1000RR Dealer, dealer@example.com",
          condition: "New",
          features: ["Quick Shifter", "Traction Control", "ABS"],
          bikeType: {id:1,name:'Sport Bike'},
          frameSize: 0, // You can set this value
          year: 2023,
          location: "Los Angeles",
          image: "../../assets/Img/s1000rr.jpg", // Use the correct image path
        },
        {
          bikeName: "Cb1000RRR",
          description: "A powerful and stylish super sportbike.",
          price: 18000,
          contactInfo: "Contact: Cb1000RRR Dealer, dealer@example.com",
          condition: "New",
          features: ["Brembo Brakes", "Ohlins Suspension"],
          bikeType: {id:1,name:'Sport Bike'},
          frameSize: 0, // You can set this value
          year: 2023,
          location: "New York",
          image: "../../assets/Img/cb1000rrr.png", // Use the correct image path
        },
        {
          bikeName: "Husqvarna 701",
          description: "A versatile and lightweight dual-sport motorcycle.",
          price: 12000,
          contactInfo: "Contact: Husqvarna Dealer, dealer@example.com",
          condition: "New",
          features: ["Off-road Capabilities", "LED Lights"],
          bikeType: {id:2,name:'Dirt Bike'},
          frameSize: 0, // You can set this value
          year: 2023,
          location: "Denver",
          image: "../../assets/Img/husqvarna701.avif", // Use the correct image path
        },
        {
          bikeName: "YZF-R1",
          description: "An iconic and high-performance sportbike.",
          price: 18000,
          contactInfo: "Contact: Yamaha Dealer, yamaha@example.com",
          condition: "New",
          features: ["Racing Capabilities", "Advanced Electronics"],
          bikeType: { id: 1, name: 'Sport Bike' },
          frameSize: 0, // You can set this value
          year: 2023,
          location: "Los Angeles",
          image: "../../assets/Img/YZF-R1.jpg", // Use the correct image path
        },
        {
          bikeName: "GSX-R1250R",
          description: "A powerful and comfortable sport touring motorcycle.",
          price: 15000,
          contactInfo: "Contact: Suzuki Dealer, suzuki@example.com",
          condition: "New",
          features: ["Touring Capabilities", "Enhanced Suspension"],
          bikeType: { id: 3, name: 'Sport Touring' },
          frameSize: 0, // You can set this value
          year: 2023,
          location: "Miami",
          image: "../../assets/Img/GSX-R1250R.jpg", // Use the correct image path
        },
        {
          bikeName: "H2R",
          description: "The pinnacle of supercharged hypersport motorcycles.",
          price: 33000,
          contactInfo: "Contact: Kawasaki Dealer, kawasaki@example.com",
          condition: "New",
          features: ["Supercharged Engine", "Track-focused Design"],
          bikeType: { id: 4, name: 'Hypersport' },
          frameSize: 0, // You can set this value
          year: 2023,
          location: "New York",
          image: "../../assets/Img/H2R.jpg", // Use the correct image path
        },
      ];
    this.bikeType=[
      { id: 1, name: 'Sport Bike' },
      { id: 2, name: 'Dirt Bike' },
      { id: 3, name: 'Sport Touring' },
      { id: 4, name: 'Hypersport' }
    ];
    this.bikeBought=[];
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
  addBikeListing(bikeListing: BikeListing) {
    this.bikeListings.push(bikeListing);
    console.log(`Bike listing added: ${bikeListing.bikeName}`);
  }

  deleteBikeListing(bikeListing: BikeListing) {
    const index = this.bikeListings.indexOf(bikeListing);
    if (index !== -1) {
      this.bikeListings.splice(index, 1);
    }
  }

  getBikeListing(bikeName: string) {
    return this.bikeListings.find((bike) => bike.bikeName === bikeName);
  }

  editBikeListing(updatedBikeListing: BikeListing) {
    const index = this.bikeListings.findIndex((bike) => bike.bikeName === updatedBikeListing.bikeName);
    if (index !== -1) {
      this.bikeListings[index] = updatedBikeListing;
    }
  }
  findBike(num: String): BikeListing {
    return this.bikeListings.find(e => e.bikeName === num)!;
  }
  editBike(o: BikeListing) {
    this.deleteBikeListing(o);
    this.addBikeListing(o);
  }
  getNbBikes(): number {
    return this.bikeListings.length;
  }

  getAVGpriceBike(): number {
    const totalPrices = this.bikeListings.reduce((acc, bike) => acc + bike.price, 0);
    const averagePrice = totalPrices / this.bikeListings.length;
    return isNaN(averagePrice) ? 0 : +averagePrice.toFixed(3);
  }
  listBikeTypes()
  {
    return this.bikeType
  }
  viewBikeTypes(num: number) {
    return this.bikeType.find(bikeType => bikeType.id == num)!;
  } 
  getNbBikeTypes() : number{
    return this.bikeListings.length;
  }
  buyBikeListing(e : BikeListing,x : string){
    e.owner=x;
    this.bikeBought.push(e);
  }
  getBikeLocations():String[]{
    let bikeLocations: string[] = [];
    this.bikeListings.forEach(element => {
      if(bikeLocations.indexOf(element.location)==-1)
      {
        bikeLocations.push(element.location);
      }
    });
    return bikeLocations;
  }
  getBikeFeatures(name:string){
    let e:BikeListing;
    e=this.findBike(name);
    return e.features;
  }

}
