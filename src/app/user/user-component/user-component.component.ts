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
  isMyProfile: boolean;
  following: boolean;
  ngOnInit() {
    if (this.activatedRoute.snapshot.url[1]) {
      this.isMyProfile = false;
      this.userService.find(this.activatedRoute.snapshot.url[1].path).subscribe((data) => { this.user = data.user; this.following = data.following });
    }
    else {
      this.isMyProfile = true;
      this.user = this.authService.user;
    }
  }

  follow() {
    this.userService.follow(this.user.Id).subscribe(result => { if (result) this.following = true; })
  }
  unfollow() {
    this.userService.unfollow(this.user.Id).subscribe(result => { if (result) this.following = false; })
  }
}
