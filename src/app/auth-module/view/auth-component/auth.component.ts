import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogged = false;
  constructor(private authService: AuthService, public loginDialog: MatDialog) {
    this.authService.appUser$.subscribe((user) => {
      this.isLogged = !!user;
    });
  }

  ngOnInit(): void {}

  popupLogIn() {
    const dialogRef = this.loginDialog.open(LoginFormComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
