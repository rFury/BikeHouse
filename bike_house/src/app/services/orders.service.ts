import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../model/Order.model';
import { OrderAccessory } from '../model/OrderAccessory.model';
import { OA } from '../model/OA.model';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }
  private apiUrl = "http://127.0.0.1:8000/Orders";
  getOrder(number: string): Observable<Orders[]> {
    const params = { OrderNumber: number };
    return this.http.get<Orders[]>(this.apiUrl+"/", { params });
  }
  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.apiUrl);
  }
  getOrdersA():Observable<OrderAccessory[]> {
    return this.http.get<OrderAccessory[]>(this.apiUrl+"/Accessories");
  }
  getUserOrders(orderIds: String[]): Observable<Orders[]> {
    const params = {Orders: orderIds.map(String)}
    return this.http.get<Orders[]>(this.apiUrl+"/FindOrders", { params });
  }
  getUserOrdersAccessory(orderIds: String[]): Observable<OrderAccessory[]> {
    const params = {Orders: orderIds.map(String)}
    return this.http.get<OrderAccessory[]>(this.apiUrl+"/FindOrdersAccessory", { params });
  }

  SearchByDate(date : Date): Observable<OA[]>{
    const params = {Date : date.toString()};
    return this.http.get<OA[]>(this.apiUrl+"/SearchByDate",{params});
  }

}
