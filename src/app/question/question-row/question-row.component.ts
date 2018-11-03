import { Component, OnInit, Input } from "@angular/core";
import { IQuestion } from "src/app/shared/models/IQuestion";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { timeoutWith } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";
import { QuestionService } from "../question.service";

@Component({
  selector: "app-question-row",
  templateUrl: "./question-row.component.html",
  styleUrls: ["./question-row.component.css"]
})
export class QuestionRowComponent implements OnInit {
  @Input()
  question: IQuestion;
  UploadDate: any;
  isMyQuestion: boolean;
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private questionService: QuestionService,
    private authService: AuthService
  ) {
    this.isMyQuestion = false;
  }
  ngOnInit() {
    this.UploadDate = this.datePipe.transform(
      this.question.UploadDate,
      "dd MMM yyyy"
    );
    if (this.authService.user)
      if (this.question.Author.Id == this.authService.user.Id) {
        this.isMyQuestion = true;
      }
  }
  gotoProfile() {
    this.router.navigateByUrl("/home/profile/" + this.question.Author.Id);
  }
  deleteQuestion() {
    this.questionService.delete(this.question.Id).subscribe(data => {
      this.router.navigateByUrl("home");
    });
  }
}
