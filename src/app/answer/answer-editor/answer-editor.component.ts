import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from '../answer.service';
import { IUser } from 'src/app/shared/models/IUser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-answer-editor',
  templateUrl: './answer-editor.component.html',
  styleUrls: ['./answer-editor.component.css']
})
export class AnswerEditorComponent implements OnInit {

  @Input() Id  : string;
  user : IUser;
  constructor(private answerService : AnswerService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.user;
  }
  answer(answer:string){
    this.answerService.add(answer, this.Id).subscribe();
    (<HTMLInputElement>document.getElementById('answer')).value = '';
  }
}
