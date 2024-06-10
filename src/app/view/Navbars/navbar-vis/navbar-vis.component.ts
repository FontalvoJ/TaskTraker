import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-navbar-vis',
  templateUrl: './navbar-vis.component.html',
  styleUrls: ['./navbar-vis.component.css']
})
export class NavbarVisComponent {

  constructor(public authService: AuthService) { }
}
