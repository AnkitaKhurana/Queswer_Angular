import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../shared/services/token.service';
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn: boolean;
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService, private apiService: ApiService) {
    this.loggedIn = true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.tokenService.getToken()) {
      this.apiService.get('/user/profile')
        .subscribe(
          data=>{
           this.authService.user  = data.json().user;
          },
          err=>{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            this.loggedIn = false;
          }
        );
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      this.loggedIn = false;
    }
    return this.loggedIn;
  }
}
