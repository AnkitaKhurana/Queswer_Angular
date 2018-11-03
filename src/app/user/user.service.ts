import { Injectable } from '@angular/core';
import { IUser } from '../shared/models/IUser';
import { Observable } from "rxjs";
import { AuthService } from '../shared/services/auth.service';
import { map } from 'rxjs/operators'
import { ApiService } from '../shared/services/api.service';
import { TokenService } from '../shared/services/token.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService, private tokenService: TokenService, private authService: AuthService) { }

  /// **********************************************************************
  //          Function to login user
  /// **********************************************************************
  login(user: IUser): Observable<IUser> {
    let body = {
      "Email": user.Email,
      "Password": user.Password
    }
    return this.apiService.post('/user/login', body).pipe(
      map(
        data => {
          this.authService.setAuth(data.json().user);
          return data.json();
        }
      ));
  }

  /// **********************************************************************
  //          Function to register new user 
  /// **********************************************************************
  register(user: IUser): Observable<IUser> {
    let body = {
      "Email": user.Email,
      "Password": user.Password,
      "Firstname": user.Firstname,
      "Lastname": user.Lastname
    }
    return this.apiService.post('/user/register', body).pipe(
      map(
        data => {
          this.authService.setAuth(data.json().user);
          return data;
        },
        error => {
          console.log(error)
        }
      ))

  }
}
