import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar-institution',
  templateUrl: './navbar-institution.component.html',
  styleUrls: ['./navbar-institution.component.css']
})
export class NavbarInstitutionComponent implements OnInit {

  userName: string | null = null;

  constructor(public authService: AuthService) { }

  ngOnInit() {
 
    this.userName = localStorage.getItem('userName');
  }


  logOut() {
    this.authService.logout();
    this.userName = null; 
  }
}
