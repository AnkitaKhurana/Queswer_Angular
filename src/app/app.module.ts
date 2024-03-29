import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { UserComponent } from './user/user-component/user-component.component';
import { AnswerComponent } from './answer/answer-component/answer-component.component';
import { QuestionComponent } from './question/question-component/question-component.component';
import { VoteComponent } from './vote/vote-component/vote-component.component';
import { TagComponent } from './tag/tag-component/tag-component.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoggedInComponent } from './shared/components/logged-in/logged-in.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { QuestionEditorComponent } from './question/question-editor/question-editor.component';
import { QuestionRowComponent } from './question/question-row/question-row.component';
import { DatePipe } from '@angular/common';
import { QuestionPageComponent } from './question/question-page/question-page.component';
import { AnswersComponent } from './answer/answers/answers.component';
import { AnswerEditorComponent } from './answer/answer-editor/answer-editor.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoggedOutComponent } from './shared/components/logged-out/logged-out.component';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './user/user.service';
import { ApiService } from './shared/services/api.service';
import { AnswerService } from './answer/answer.service';
import { QuestionService } from './question/question.service';
import { VoteService } from './vote/vote.service';
import { TagService } from './tag/tag.service';
import { AuthGuard } from './guards/auth.guard';
import { FeedComponent } from './question/feed/feed.component';

const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: QuestionComponent, canActivate: [AuthGuard] }]
  },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      { path: '', component: QuestionComponent },
      { path: 'question/:id', component: QuestionPageComponent },
      { path: 'question/edit/:id', component: QuestionEditorComponent, canActivate: [AuthGuard] },
      { path: 'profile/:id', component: UserComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'feed', component: FeedComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: UserComponent },
  { path: 'ask', component: QuestionEditorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AnswerComponent,
    QuestionComponent,
    VoteComponent,
    TagComponent,
    DashboardComponent,
    NavbarComponent,
    LoggedInComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    QuestionEditorComponent,
    QuestionRowComponent,
    QuestionPageComponent,
    AnswersComponent,
    AnswerEditorComponent,
    FooterComponent,
    LoggedOutComponent,
    FeedComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule

  ],
  providers: [AuthService,
    UserService,
    ApiService,
    AnswerService,
    QuestionService,
    VoteService,
    TagService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
