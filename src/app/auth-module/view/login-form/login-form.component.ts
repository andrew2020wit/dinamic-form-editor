import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth-module/auth.service';
import { IStylesState, StylesStateService } from '@app/styles-state.service';
import { Observable } from 'rxjs';
import { LoginDto } from '../../dto/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  newLoginForm: FormGroup;
  styleState$: Observable<IStylesState>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private stylesStateService: StylesStateService
  ) {
    this.newLoginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.styleState$ = this.stylesStateService.stylesState$;
  }

  ngOnInit(): void {}

  async login() {
    const user = new LoginDto();
    user.email = this.newLoginForm.get('login').value;
    user.password = this.newLoginForm.get('password').value;
    console.log('user', user);
    this.authService.loginGetToken(user);
    // setTimeout(() => location.reload(), 100);
  }
}
