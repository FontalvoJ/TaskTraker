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
        (res: { token: string, role: string }) => {

          if (res && res.token) {
            localStorage.setItem('token', res.token);

            if (res.role) {
              localStorage.setItem('role', res.role); 

              switch (res.role) {
                case 'teacher':
                  this.router.navigate(['/dashboard-teacher']);
                  break;
                case 'student':
                  this.router.navigate(['/dashboard-student']);
                  break;
                case 'institution':
                  this.router.navigate(['/dashboard-institution']);
                  break;
                case 'admin':
                  this.router.navigate(['/dashboard-admin']);
                  break;
                default:
                  this.router.navigate(['/home']);
                  break;
              }
            } else {
              console.error('El rol del usuario no está definido.');
              this.router.navigate(['/home']);
            }
          } else {
            console.error('Token o respuesta de usuario no válida.');
            this.router.navigate(['/home']);
          }
        },
        (err) => {
          console.log(err); 
          alert('Error al iniciar sesión: ' + (err.error?.message || 'Inténtalo de nuevo más tarde.'));
        }
      );
  }
}
