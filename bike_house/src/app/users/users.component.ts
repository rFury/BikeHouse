import { Component, OnInit } from '@angular/core';
import { Compte } from '../model/compte.model';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Users: Compte[] = [];
  constructor(private actRoute: ActivatedRoute, private route: Router , public AuthServ:AuthService) {}
  SuppUser(e: Compte) {
    let rep = confirm("Etes-vous sûr de vouloir deleter ce moto");
    if (rep) {
    this.AuthServ.deleteUserListing(e);
    this.route.navigate(['users']);
    }
  }
  ngOnInit(): void {
    this.Users = this.AuthServ.getUserListings();
  }
}
