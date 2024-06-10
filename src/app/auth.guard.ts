import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    // Si no está autenticado, redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
    return false;
  }
}

