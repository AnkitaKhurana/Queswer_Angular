import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { QuestionService } from 'src/app/question/question.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: Boolean;
  subscription: Subscription;

  constructor(private authService: AuthService, private questionService: QuestionService, private router: Router) {
    this.loggedIn = false;
  }
  ngOnInit() {
    this.subscription = this.authService.loggedInObservable.subscribe(data => this.loggedIn = data);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  search(seacrhString: string) {
    this.questionService.getAll(1, seacrhString).subscribe();
    this.router.navigateByUrl('/home');
  }
}
