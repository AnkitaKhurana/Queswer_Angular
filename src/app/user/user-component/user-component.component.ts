import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/IUser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private userService: UserService) { }
  user: IUser;
  ngOnInit() {
    if (this.activatedRoute.snapshot.url[1]) {
      this.userService.find(this.activatedRoute.snapshot.url[1].path).subscribe(user => { this.user = user; });
    }
    else {
      this.user = this.authService.user;
    }
  }
}
