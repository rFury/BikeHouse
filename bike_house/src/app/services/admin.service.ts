import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from'@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../model/Admin.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = "http://127.0.0.1:8000/Admins";
  constructor(private http: HttpClient) { }
  AddAdmin(val:Admin): Observable<Admin[]> {
      return this.http.post<Admin[]>(this.apiUrl,val)
  }
  findAdmin(userEmail: string): Observable<Admin[]> {
      const params = { AdminEmail: userEmail };
      return this.http.get<Admin[]>(this.apiUrl+"/FindAdmin", { params });
  }
}
