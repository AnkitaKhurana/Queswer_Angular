import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { IQuestion } from 'src/app/shared/models/IQuestion';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent implements OnInit {
  get Title() { return this.form.get('Title'); }
  get Description() { return this.form.get('Description'); }
  get Tags() { return this.form.get('Tags'); }

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private formBuilder: FormBuilder, private router: Router) {
    this.question = {} as IQuestion;
    this.question.Title = '';
    this.question.Description = '';
    this.question.Tags = [];
    this.form = this.formBuilder.group({
      Title: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      Description: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      Tags: null
    });
  }
  form: FormGroup;
  responseError: string;
  question: IQuestion;

  ask() {
    if (this.form.value.Tags) {
      let tags = (this.form.value.Tags).toString().split(',');
      this.form.value.Tags = tags;
    }
    else {
      this.form.value.Tags = [];
    }
    if (this.activatedRoute.snapshot.url[2]) {
      this.questionService.edit(this.form.value, this.activatedRoute.snapshot.url[2].path).subscribe(questionReturned => {
        this.router.navigateByUrl('/home/question/' + questionReturned.Id);
      },
        error => {
          this.responseError = JSON.parse(error._body).errors;
        }
      )
    }
    else {
      this.questionService.add(this.form.value).subscribe(questionReturned => {
        this.router.navigateByUrl('/home/question/' + questionReturned.Id);
      },
        error => {
          this.responseError = JSON.parse(error._body).errors;
        }
      )
    }
  }

  ngOnInit() {
    this.responseError = '';
    if (this.activatedRoute.snapshot.url[2]) {
      this.questionService.getQuestion(this.activatedRoute.snapshot.url[2].path).subscribe(data => {
        this.question = data;
        var tags = [];
        data.Tags.map(value => tags.push(value.Body));
        this.form.reset({
          Title: [this.question.Title],
          Description: [this.question.Description],
          Tags: tags
        });
      });
    }
  }

}
