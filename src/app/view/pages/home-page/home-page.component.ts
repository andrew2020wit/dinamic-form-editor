import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth-module/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isLogged = false;
  constructor(private authService: AuthService) {
    this.authService.appUser$.subscribe((user) => {
      this.isLogged = !!user;
    });
  }

  ngOnInit(): void {}
}
