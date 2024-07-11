import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar-institution',
  templateUrl: './navbar-institution.component.html',
  styleUrls: ['./navbar-institution.component.css']
})

export class NavbarInstitutionComponent {

  constructor(public authService: AuthService) { }
}
