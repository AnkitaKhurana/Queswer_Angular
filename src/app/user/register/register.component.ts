import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  get Firstname() { return this.form.get('Firstname'); }
  get Lastname() { return this.form.get('Lastname'); }
  get Email() { return this.form.get('Email'); }
  get Password() { return this.form.get('Password'); }

  constructor(private userService: UserService
    , private formBuilder: FormBuilder, private router: Router) { }
  form: FormGroup;
  responseError: string;
  register(): void {
    this.userService.register(this.form.value).subscribe(user => {
      this.router.navigateByUrl('/');
    },
      error => {
        this.responseError = JSON.parse(error._body).error;
      }
    )
  }
  ngOnInit() {
    this.responseError = '';
    this.form = this.formBuilder.group({
      Email: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      Password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      Firstname: [null, Validators.required],
      Lastname: [null, Validators.required]
    });
  }
}
