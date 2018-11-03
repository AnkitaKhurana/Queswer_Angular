import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/IUser';
import { TokenService } from './token.service';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedInObservable = this.loggedIn.asObservable();
  public user: IUser;
  constructor(private apiService: ApiService, private tokenService: TokenService) { }


  // **********************************************************************
  //          Function to setup app
  /// **********************************************************************
  setup() {
    if (this.tokenService.getToken()) {
      this.apiService.get('/user/profile')
        .subscribe(
          data => {
            var result = data.json();
            result.user.Token = this.tokenService.getToken().toString();
            this.setAuth(result.user);
          }
        );
    } else {
      this.logout();
    }
  }

  /// **********************************************************************
  //          Function to loggout user from session
  /// **********************************************************************
  logout() {
    this.tokenService.destroyToken();
    this.loggedIn.next(false);
    this.user = null;
  }

  /// **********************************************************************
  //          Function to set authentication 
  /// **********************************************************************
  setAuth(user: IUser) {
    if (user) {
      this.tokenService.saveToken(user.Token);
      this.loggedIn.next(true);
      this.user = user;
    }
  }
}

