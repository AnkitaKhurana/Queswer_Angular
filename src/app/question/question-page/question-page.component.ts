import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IQuestion } from "src/app/shared/models/IQuestion";
import { QuestionService } from "../question.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { IUser } from "src/app/shared/models/IUser";

@Component({
  selector: "app-question-page",
  templateUrl: "./question-page.component.html",
  styleUrls: ["./question-page.component.css"]
})
export class QuestionPageComponent implements OnInit {
  isMyQuestion: boolean;
  question: IQuestion;
  user: IUser;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.question = {} as IQuestion;
    this.questionService
      .getQuestion(this.route.snapshot.paramMap.get("id"))
      .subscribe(question => {
        this.user = this.authService.user;
        this.question = question;
        if (this.authService.user && this.question.Author.Id == this.authService.user.Id) {
          this.isMyQuestion = true;
        } else this.isMyQuestion = false;
      });
  }
  deleteQuestion(){
    this.questionService.delete(this.question.Id).subscribe(data=>{
      this.router.navigateByUrl('home') ;
    })
  }
}
