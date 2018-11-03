import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  get Email() { return this.form.get('Email') }
  get Password() { return this.form.get('Password') }

  responseError: string;
  returnUrl: string;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  login(): void {
    this.userService.login(this.form.value).subscribe(user => {
      if (this.returnUrl != null) {
        this.router.navigateByUrl(this.returnUrl.split('/')[1])
      }
      else
        this.router.navigateByUrl('/home')
    },
      error => {
        this.responseError = JSON.parse(error._body);
      }
    )

  }

  ngOnInit() {
    this.responseError = '';
    this.form = this.formBuilder.group({
      Email: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      Password: [null, Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

}
