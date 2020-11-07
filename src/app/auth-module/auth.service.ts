import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { baseApiUrl } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { JWTokenDTO } from './dto/token-object.dto';

const jwtHelperService = new JwtHelperService();
const keyLocalStorToken = 'keyLocalStorToken';

export interface IUser {
  fullName: string;
  exp: number;
}

export interface IToken {
  sub: number;
  iat: number;
  exp: number;
  nbf: number;
  iss: string;
  jti: string;
  prv: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _appUser$ = new BehaviorSubject<IUser | null>(null);
  appUser$ = this._appUser$.asObservable();
  currentToken = '';

  constructor(private http: HttpClient, private router: Router) {}

  get appUser(): IUser | null {
    return this._appUser$.getValue();
  }

  loadLocalToken() {
    const access_token = localStorage.getItem(keyLocalStorToken);
    if (!access_token) {
      this._appUser$.next(null);
      this.currentToken = '';
    } else {
      this.currentToken = access_token;
      const tokenObj: IToken = jwtHelperService.decodeToken(access_token);
      const user1: IUser = {
        fullName: tokenObj.sub.toString(),
        exp: tokenObj.exp,
      };
      this._appUser$.next(user1);
      this.checkExpOfToken();
    }
  }

  async loginGetToken(user: LoginDto) {
    this.http
      .post<JWTokenDTO>(baseApiUrl + '/auth/login', user)
      .subscribe((tokenObj) => {
        console.log('tokenObj22', tokenObj);
        localStorage.setItem(keyLocalStorToken, tokenObj.access_token);
        this.loadLocalToken();
      });
  }

  async logout() {
    setTimeout(() => {
      this.http.post(baseApiUrl + '/auth/logout', {}).subscribe((x) => {
        console.log('/auth/logout: ', x);
      });
    });
    this.router.navigate(['']);
    localStorage.removeItem(keyLocalStorToken);
    this._appUser$.next(null);
    setTimeout(() => location.reload());
  }

  checkExpOfToken(): boolean {
    if (!this.appUser) {
      return false;
    }

    const exp = 1000 * this.appUser.exp;
    const curTime: number = new Date().getTime();

    if (exp < curTime) {
      console.log('token too old, logout');
      this.logout();
      return false;
    }

    return true;
  }
}
