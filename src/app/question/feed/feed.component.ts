import { Component, OnInit } from "@angular/core";
import { IQuestion } from "src/app/shared/models/IQuestion";
import { QuestionService } from "../question.service";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"]
})
export class FeedComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private questionService: QuestionService
  ) {}
  questions: Array<IQuestion>;
  ngOnInit() {
    this.questionService.getFeed().subscribe();
    this.questionService.questionsObservable.subscribe(
      questions => (this.questions = questions)
    );
  }
}
