import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-navbar-teacher',
  templateUrl: './navbar-teacher.component.html',
  styleUrls: ['./navbar-teacher.component.css']
})
export class NavbarTeacherComponent implements OnInit {

  isMenuOpen = false;
  userName: string | null = null;

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
