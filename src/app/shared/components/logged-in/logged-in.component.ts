import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/IUser';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  user: IUser;
  constructor(private authService: AuthService, private router: Router) { }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }

}
