import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth-module/auth.service';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.scss'],
})
export class UserWidgetComponent implements OnInit {
  userName = '';
  constructor(private authService: AuthService, private router: Router) {
    this.authService.appUser$.subscribe((user) => {
      if (!!user) {
        this.userName = user.fullName;
      } else {
        this.userName = '';
      }
    });
  }

  ngOnInit(): void {}

  async logOut() {
    await this.authService.logout();
    this.router.navigate(['']);
  }
}
