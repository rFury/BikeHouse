import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from'@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';
const httpOptions = {
 headers: new HttpHeaders({
 'Content-Type': 'application/json',
 })
}
@Injectable({
 providedIn: 'root'
})
export class UsersService {
    private apiUrl = "http://127.0.0.1:8000/Users";
    constructor(private http: HttpClient) { }
    AddUser(val:UserModel): Observable<UserModel[]> {
        return this.http.post<UserModel[]>(this.apiUrl,val)
    }
    findUser(userEmail: string): Observable<UserModel[]> {
        const params = { UserEmail: userEmail };
        return this.http.get<UserModel[]>(this.apiUrl+"/FindUser", { params });
    }
    getUserId(id:number|undefined):Observable<UserModel>{
        return this.http.get<UserModel>(this.apiUrl+"/"+id);
    }

    OrderBike(idU:number|undefined,idB:string):Observable<any>|null{
        if (idU != undefined){
            const params = { UserId:String(idU), BikeId:idB };
            return this.http.post<any[]>(this.apiUrl+"/OrderBike",params);
        }
        else{   
            return null;
        }
      }
    getUsers():Observable<any[]>{
        return this.http.get<any[]>(this.apiUrl);
    }
    OrderAccessory(idU:number|undefined,idA:string,QuantityO:Number):Observable<any>|null{
        if (idU != undefined){
            const params = { UserId:String(idU), AccessoryId:idA ,Quantity:QuantityO};
            return this.http.post<any[]>(this.apiUrl+"/OrderAccessory",params);
        }
        else{
            return null;
        }
    }

    deleteUser(idU:number):Observable<any>{
        return this.http.delete<any[]>(this.apiUrl+"/"+idU)
    }

}