import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from '../answer.service';
import { IAnswer } from 'src/app/shared/models/IAnswer';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  @Input() Id: string;
  answers: Array<IAnswer>
  constructor(private answerService: AnswerService) {}
  ngOnInit() {
  }
  ngOnChanges(){
    if(this.Id){
      this.answerService.getAnswers(this.Id).subscribe();
      this.answerService.answersObservable.subscribe(answers => {this.answers = answers;});
    }  
  
  }
}
