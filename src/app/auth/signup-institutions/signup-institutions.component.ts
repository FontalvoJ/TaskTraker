import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup-institutions',
  templateUrl: './signup-institutions.component.html',
  styleUrls: ['./signup-institutions.component.css']
})
export class SignupInstitutionsComponent {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signUp() {
    this.authService.signUp(this.user)
      .subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/list-teachers']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
