import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accessory } from '../model/Accessory.model';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  constructor(private http:HttpClient) { }
  private apiUrl = "http://127.0.0.1:8000/Accessories";

  getAccessories():Observable<Accessory[]>{
    return this.http.get<Accessory[]>(this.apiUrl);
  }
  SearchAccessories(params:{}):Observable<Accessory[]>{
    return this.http.get<Accessory[]>(this.apiUrl+"/FindAccessories",{params});
  }
  getAccessoryById(id:string):Observable<Accessory>{
    return this.http.get<Accessory>(this.apiUrl+"/"+parseInt(id));
  }
  getUserAccessories(ids: String[]): Observable<Accessory[]> {
    const params = {Accessories: ids.map(String)}
    return this.http.get<Accessory[]>(this.apiUrl+"/AccessoriesIds", { params });
  }

  deleteAccessory(id: number): Observable<any>{
    return this.http.delete(this.apiUrl+"/"+id);
  }

  addAccessory(accessory:Accessory): Observable<any>{
    return this.http.post<any>(this.apiUrl,accessory);
  }

  updateAccessory(Accessory: Accessory): Observable<Accessory> {
    const url = `${this.apiUrl}/${Accessory.AccessoryId}`;
    return this.http.put<Accessory>(url, Accessory);
  }

}
