import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { QuestionEditorComponent } from './question/question-editor/question-editor.component';
import { QuestionComponent } from './question/question-component/question-component.component';
import { UserComponent } from './user/user-component/user-component.component';
import { QuestionPageComponent } from './question/question-page/question-page.component';

const appRoutes: Routes = [
    {
        path: '', component: DashboardComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: QuestionComponent, canActivate:[AuthGuard] }]
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
    { path: 'profile', component: UserComponent },
    { path: 'ask', component: QuestionEditorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: PageNotFoundComponent }
];

export default appRoutes;