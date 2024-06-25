import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signIn() {
    this.authService.signIn(this.user)
      .subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          
          // Redirige dependiendo del rol del usuario
          if (res.user && res.user.role === 'teacher') {
            this.router.navigate(['/dashboard-teacher']);
          } else if (res.user && res.user.role === 'student') {
            this.router.navigate(['/dashboard-student']);
          } else if (res.user && res.user.role === 'institution') {
            this.router.navigate(['/dashboard-institution']);
          } else {
            
            this.router.navigate(['/home']);
          }
        },
        (err) => {
          console.log(err);
          // Manejo de errores
        }
      );
  }

}
