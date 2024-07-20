import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar-student',
  templateUrl: './navbar-student.component.html',
  styleUrls: ['./navbar-student.component.css']
})
export class NavbarStudentComponent implements OnInit {
  userName: string | null = null;
  isMenuOpen = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

  logOut() {
    this.authService.logout();
    this.userName = null;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
