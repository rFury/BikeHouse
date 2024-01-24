import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../model/Order.model';
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
  getUserOrders(orderIds: String[]): Observable<Orders[]> {
    const params = {Orders: orderIds.map(String)}
    return this.http.get<Orders[]>(this.apiUrl+"/FindOrders", { params });
  }

}
