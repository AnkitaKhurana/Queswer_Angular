import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { IQuestion } from 'src/app/shared/models/IQuestion';

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrls: ['./question-component.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Array<IQuestion>;
  pageNumber: number;
  totalPages: Array<number>;

  constructor(private questionService: QuestionService) { this.pageNumber = 1; }
  ngOnInit() {
    this.questionService.getAll(this.pageNumber, '').subscribe();
    this.questionService.questionsObservable.subscribe(questions => this.questions = questions);
    this.questionService.totalQuestionsObservable.subscribe(totalQuestions =>
      this.totalPages = Array(Math.ceil(totalQuestions / 10)).fill(0).map((x, i) => i));  
  }

  updateFeed(page: number, event) {
    let list = document.getElementsByClassName('page-link');
    for (let i = 0; i < list.length; i++) {
      list[i].classList.remove('active');
    }
    this.pageNumber = page;
    event.target.classList.add('active');
    let searchString = (<HTMLInputElement>document.getElementById('inputBox')).value.toString();
    this.questionService.getAll(this.pageNumber + 1, searchString).subscribe();
  }
}
