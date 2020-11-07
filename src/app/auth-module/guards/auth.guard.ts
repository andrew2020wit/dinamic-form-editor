import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/auth-module/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.checkExpOfToken()) {
      return true;
    }

    setTimeout(() => alert('login or register!'));
    this.router.navigate(['']);
    return false;
  }
}
