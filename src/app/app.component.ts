import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth-module/auth.service';
import { Observable } from 'rxjs';
import { menuList } from './site-menu';
import { IStylesState, StylesStateService } from './styles-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  menuOn = true;
  links = menuList;
  styleState$: Observable<IStylesState>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private stylesStateService: StylesStateService
  ) {
    this.authService.loadLocalToken();
    this.styleState$ = this.stylesStateService.stylesState$;
  }
  ngOnInit(): void {}

  setTheme(str: string) {
    this.stylesStateService.setTheme(str);
  }

  toHome() {
    this.router.navigate(['']);
    setTimeout(() => document.location.reload(), 0);
  }
}
